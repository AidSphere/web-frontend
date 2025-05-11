import ApiClient from './ApiClient';
import { jwtDecode } from 'jwt-decode';

// JWT token payload interface
interface JwtPayload {
  roles: string[];  // Array of roles like ["PATIENT"]
  username: string;
  sub: string;
  iat: number;
  exp: number;
}

/**
 * Service for handling authentication-related operations
 */
class AuthService {
  private static instance: AuthService;
  private apiClient: ApiClient;
  
  private constructor() {
    this.apiClient = ApiClient.getInstance();
  }
  
  /**
   * Get singleton instance of AuthService
   */
  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }
  
  /**
   * Authenticate a user and get a JWT token
   * @param email User email
   * @param password User password
   * @returns Authentication response
   */
  public async login(
    email: string, 
    password: string
  ): Promise<{ success: boolean; token?: string; message?: string }> {
    try {
      // Use ApiClient to make the login request to ensure proper base URL
      const response = await this.apiClient.post('/login', {
        email,
        password
      });
      
      if (!response.success) {
        return { 
          success: false, 
          message: response.message || 'Authentication failed' 
        };
      }
      
      // Check for token in different possible locations in the response
      // The token might be directly in response.data, or nested in a property
      let token: string | undefined;
      
      if (typeof response.data === 'string' && response.data.startsWith('eyJ')) {
        // If the token is directly returned as a string
        token = response.data;
      } else if (response.data?.token && typeof response.data.token === 'string') {
        // If the token is in a token property
        token = response.data.token;
      } else if (response.data?.access_token && typeof response.data.access_token === 'string') {
        // If the token is in an access_token property
        token = response.data.access_token;
      } else if (response.data?.jwt && typeof response.data.jwt === 'string') {
        // If the token is in a jwt property
        token = response.data.jwt;
      }
      
      // Log the full response to help with debugging
      console.log('Auth response:', response);
      
      if (!token) {
        return { 
          success: false, 
          message: 'Authentication failed: No token received from server' 
        };
      }
      
      // Store token in localStorage
      this.setToken(token);
      return { success: true, token };
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Try to extract the most descriptive error message
      let errorMessage = 'Failed to connect to authentication server';
      
      if (error.message) {
        errorMessage = error.message;
      }
      
      if (typeof error === 'object' && error !== null) {
        // If it's our ApiResponse type
        if ('message' in error) {
          errorMessage = error.message;
        }
      }
      
      return { 
        success: false, 
        message: errorMessage
      };
    }
  }
  
  /**
   * Log out the current user
   */
  public logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
  }
  
  /**
   * Get the stored authentication token
   * @returns JWT token or null if not authenticated
   */
  public getToken(): string | null {
    return localStorage.getItem('authToken');
  }
  
  /**
   * Store the authentication token
   * @param token JWT token
   */
  private setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }
  
  /**
   * Check if user is authenticated
   * @returns True if user has a valid token
   */
  public isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const currentTime = Date.now() / 1000;
      
      // Check if token is expired
      return decoded.exp > currentTime;
    } catch (error) {
      console.error('Error decoding token:', error);
      return false;
    }
  }
  
  /**
   * Get the user's role from the token
   * @returns User primary role or null if not authenticated
   */
  public getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;
    
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      // Return the first role from the roles array
      return decoded.roles && decoded.roles.length > 0 ? decoded.roles[0] : null;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
  
  /**
   * Get all user roles from the token
   * @returns Array of user roles or empty array if not authenticated
   */
  public getUserRoles(): string[] {
    const token = this.getToken();
    if (!token) return [];
    
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.roles || [];
    } catch (error) {
      console.error('Error decoding token:', error);
      return [];
    }
  }
  
  /**
   * Get the username from the token
   * @returns Username or null if not authenticated
   */
  public getUsername(): string | null {
    const token = this.getToken();
    if (!token) return null;
    
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.username;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
  
  /**
   * Get the dashboard route based on user role
   * @returns Dashboard route
   */
  public getDashboardRoute(): string {
    const role = this.getUserRole();
    
    if (!role) return '/auth/login';
    
    switch (role) {
      case 'PATIENT':
        return '/patient';
      case 'DRUG_IMPORTER':
        return '/importer';
      case 'DONOR':
        return '/donor/home';
      case 'ADMIN':
        return '/admin';
      default:
        return '/auth/login';
    }
  }
  
  /**
   * Check if user has specific role
   * @param role Role to check
   * @returns True if user has the role
   */
  public hasRole(role: string): boolean {
    const roles = this.getUserRoles();
    return roles.includes(role);
  }
  
  /**
   * Add token to Authorization header
   * @param headers Headers object to add Authorization to
   * @returns Headers with Authorization
   */
  public addAuthHeader(headers: Record<string, string> = {}): Record<string, string> {
    const token = this.getToken();
    if (token) {
      return {
        ...headers,
        'Authorization': `Bearer ${token}`
      };
    }
    return headers;
  }
}

export default AuthService;