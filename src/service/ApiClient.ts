import { AxiosInstance, AxiosResponse } from 'axios';
import ApiService, { ApiResponse } from './ApiService';

/**
 * Client for making API calls with standardized response handling
 */
class ApiClient {
  private static instance: ApiClient;
  private axios: AxiosInstance;

  private constructor() {
    this.axios = ApiService.getInstance().getAxiosInstance();
  }

  /**
   * Get singleton instance of ApiClient
   */
  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  /**
   * Make a GET request
   * @param endpoint API endpoint
   * @param config Additional Axios config
   * @returns Standardized API response
   */
  public async get<T>(endpoint: string, config?: any): Promise<ApiResponse<T>> {
    return this.apiCall<T>('get', endpoint, undefined, config);
  }

  /**
   * Make a POST request
   * @param endpoint API endpoint
   * @param data Request payload
   * @param config Additional Axios config
   * @returns Standardized API response
   */
  public async post<T>(endpoint: string, data?: any, config?: any): Promise<ApiResponse<T>> {
    return this.apiCall<T>('post', endpoint, data, config);
  }

  /**
   * Make a PUT request
   * @param endpoint API endpoint
   * @param data Request payload
   * @param config Additional Axios config
   * @returns Standardized API response
   */
  public async put<T>(endpoint: string, data?: any, config?: any): Promise<ApiResponse<T>> {
    return this.apiCall<T>('put', endpoint, data, config);
  }

  /**
   * Make a DELETE request
   * @param endpoint API endpoint
   * @param config Additional Axios config
   * @returns Standardized API response
   */
  public async delete<T>(endpoint: string, config?: any): Promise<ApiResponse<T>> {
    return this.apiCall<T>('delete', endpoint, undefined, config);
  }

  /**
   * Upload a file
   * @param endpoint API endpoint
   * @param file File to upload
   * @param fieldName Name of the form field (default: 'file')
   * @param extraData Additional form data
   * @param config Additional Axios config
   * @returns Standardized API response
   */
  public async uploadFile<T>(
    endpoint: string, 
    file: File, 
    fieldName: string = 'file',
    extraData?: Record<string, any>,
    config?: any
  ): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append(fieldName, file);
    
    // Add any extra form data if provided
    if (extraData) {
      Object.entries(extraData).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }
    
    const uploadConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      ...config
    };
    
    return this.apiCall<T>('post', endpoint, formData, uploadConfig);
  }

  /**
   * Generic method to make API calls with standardized response handling
   * @param method HTTP method
   * @param endpoint API endpoint
   * @param data Request payload
   * @param config Additional Axios config
   * @returns Standardized API response
   */
  private async apiCall<T>(
    method: 'get' | 'post' | 'put' | 'delete', 
    endpoint: string, 
    data?: any, 
    config?: any
  ): Promise<ApiResponse<T>> {
    try {
      let response: AxiosResponse;
      
      switch (method) {
        case 'get':
          response = await this.axios.get(endpoint, config);
          break;
        case 'post':
          response = await this.axios.post(endpoint, data, config);
          break;
        case 'put':
          response = await this.axios.put(endpoint, data, config);
          break;
        case 'delete':
          response = await this.axios.delete(endpoint, config);
          break;
      }

      // Process successful response
      return {
        success: true,
        data: response.data?.data || response.data,
        message: response.data?.message || 'Operation successful',
        status: response.status
      };
    } catch (error: any) {
      // If the error is already in our ApiResponse format (from interceptor)
      if (error && 'success' in error && error.success === false) {
        return error as ApiResponse<T>;
      }
      
      // Extract error message from error response
      let errorMessage = 'An unexpected error occurred';
      let statusCode = 500;
      
      // Check if it's an Axios error with a response
      if (error.response) {
        statusCode = error.response.status;
        
        // Try to extract error message from various response formats
        if (error.response.data) {
          if (typeof error.response.data === 'string') {
            errorMessage = error.response.data;
          } else if (error.response.data.message) {
            errorMessage = error.response.data.message;
          } else if (error.response.data.error) {
            errorMessage = error.response.data.error;
          } else if (error.response.data.errors && Array.isArray(error.response.data.errors)) {
            errorMessage = error.response.data.errors.join(', ');
          }
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      // Log the error with details
      console.error(`API error in ${endpoint} call:`, {
        status: statusCode,
        message: errorMessage,
        error: error
      });
      
      // Return standardized error response
      return {
        success: false,
        status: statusCode,
        message: errorMessage
      };
    }
  }
}

export default ApiClient;