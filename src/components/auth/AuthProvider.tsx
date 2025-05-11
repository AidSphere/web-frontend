'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import AuthService from '@/service/AuthService';

// Define the context type
interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  username: string | null;
  role: string | null;
  login: (email: string, password: string) => Promise<{
    success: boolean;
    message?: string;
  }>;
  logout: () => void;
  hasRole: (role: string) => boolean;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  username: null,
  role: null,
  login: async () => ({ success: false }),
  logout: () => {},
  hasRole: () => false,
});

// Protected route paths by role
const protectedRoutes = {
  '/admin': ['ADMIN'],
  '/patient': ['PATIENT'],
  '/donor': ['DONOR'],
  '/donor/home': ['DONOR'],
  '/importer': ['DRUG_IMPORTER'],
};

// Public routes that don't require authentication
const publicRoutes = [
  '/auth/login',
  '/auth/donor',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/auth/verification',
  '/auth/verification-success',
  '/importer/register',
];

// Auth Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const authService = AuthService.getInstance();
  
  // State
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  // Login function
  const login = async (email: string, password: string) => {
    const response = await authService.login(email, password);
    
    if (response.success) {
      // Update auth state
      setIsAuthenticated(true);
      setUsername(authService.getUsername());
      setRole(authService.getUserRole());
      
      // Redirect to appropriate dashboard
      router.push(authService.getDashboardRoute());
      return { success: true };
    }
    
    return { 
      success: false, 
      message: response.message || 'Authentication failed'
    };
  };

  // Logout function
  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setUsername(null);
    setRole(null);
    router.push('/auth/login');
  };

  // Check if user has a specific role
  const hasRole = (roleToCheck: string) => {
    return authService.hasRole(roleToCheck);
  };

  // Check authentication on mount and route changes
  useEffect(() => {
    const checkAuth = () => {
      setIsLoading(true);
      
      // Check if user is authenticated
      if (authService.isAuthenticated()) {
        setIsAuthenticated(true);
        setUsername(authService.getUsername());
        setRole(authService.getUserRole());
        
        // Check if user has access to the current route
        const currentPath = pathname;
        
        // Handle root path
        if (currentPath === '/') {
          router.push(authService.getDashboardRoute());
          setIsLoading(false);
          return;
        }
        
        // Check protected routes
        for (const [route, allowedRoles] of Object.entries(protectedRoutes)) {
          if (currentPath.startsWith(route)) {
            const userRole = authService.getUserRole();
            
            if (!userRole || !allowedRoles.includes(userRole)) {
              // Redirect to appropriate dashboard if user doesn't have access
              router.push(authService.getDashboardRoute());
            }
            break;
          }
        }
      } else {
        // User is not authenticated
        setIsAuthenticated(false);
        setUsername(null);
        setRole(null);
        
        // Check if current route is protected
        const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
        
        if (!isPublicRoute && pathname !== '/') {
          // Redirect to login if trying to access protected route
          router.push('/auth/login');
        }
      }
      
      setIsLoading(false);
    };
    
    checkAuth();
  }, [pathname, router]);

  // Context value
  const value = {
    isAuthenticated,
    isLoading,
    username,
    role,
    login,
    logout,
    hasRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use auth context
export const useAuth = () => useContext(AuthContext);