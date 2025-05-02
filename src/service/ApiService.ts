import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Common API response interface
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  status?: number;
}

/**
 * Base service for API configuration and interceptors
 */
class ApiService {
  private static instance: ApiService;
  private readonly baseURL: string = 'http://localhost:8080/api/v1';
  private axiosInstance: AxiosInstance;

  private constructor() {
    // Create axios instance with default config
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000, // 30 seconds timeout
    });

    this.setupInterceptors();
  }

  /**
   * Get singleton instance of ApiService
   */
  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  /**
   * Get the configured axios instance
   */
  public getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }

  /**
   * Setup request and response interceptors
   */
  private setupInterceptors(): void {
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // // Add auth token if available
        // const token = localStorage.getItem('token');
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        // Transform error to standardized format and reject with it
        return Promise.reject(this.handleAxiosError(error));
      }
    );
  }

  /**
   * Central error handler for axios errors
   */
  private handleAxiosError(error: AxiosError): ApiResponse {
    const errorData: ApiResponse = {
      success: false,
      status: error.response?.status || 500,
      message: 'An error occurred with the request',
      data: error.response?.data || null
    };
    
    // Extract the message from the response if available
    if (error.response?.data && typeof error.response.data === 'object' && 'message' in error.response.data) {
      errorData.message = error.response.data.message as string;
    }
    
    // Handle specific status codes
    switch (error.response?.status) {
      case 409:
        errorData.message = errorData.message || 'A resource with this identifier already exists';
        console.warn('API conflict:', errorData.message);
        break;
      case 400:
        errorData.message = errorData.message || 'Invalid information provided';
        console.warn('Invalid data:', errorData.message);
        break;
      case 401:
        errorData.message = errorData.message || 'Authentication required. Please log in';
        console.warn('Authentication error:', errorData.message);
        // Handle authentication related actions here
        // e.g., redirect to login page, clear session, etc.
        break;
      case 403:
        errorData.message = errorData.message || 'You do not have permission to access this resource';
        console.warn('Authorization error:', errorData.message);
        break;
      case 404:
        errorData.message = errorData.message || 'Resource not found';
        console.warn('Not found:', errorData.message);
        break;
      case 422:
        errorData.message = errorData.message || 'Validation failed. Please check your information';
        console.warn('Validation error:', errorData.message);
        break;
      case 500:
        errorData.message = 'Server error. Please try again later';
        console.warn('Server error occurred');
        break;
      default:
        console.warn('API error:', errorData.message);
    }
    
    return errorData;
  }

  /**
   * Adds a base URL segment to the configuration
   * @param segment Additional URL segment to add to the base URL
   * @returns Updated configuration
   */
  public getConfig(segment: string = ''): AxiosRequestConfig {
    return {
      baseURL: `${this.baseURL}${segment}`,
    };
  }
}

export default ApiService;