import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { apiConfig } from './apiConfig';
import {
  requestInterceptor,
  requestErrorInterceptor,
} from './interceptors/requestInterceptors';
import {
  responseInterceptor,
  responseErrorInterceptor,
} from './interceptors/responseInterceptors';
import { ApiResponse } from '@/types/responses';

// Create Axios instance with configuration
const apiClient = axios.create({
  baseURL: apiConfig.apiBaseUrl,
  timeout: apiConfig.timeout,
  withCredentials: apiConfig.withCredentials,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptors
apiClient.interceptors.request.use(requestInterceptor, requestErrorInterceptor);

// Add response interceptors
apiClient.interceptors.response.use(
  responseInterceptor,
  responseErrorInterceptor
);

// API service with typed methods
export const apiService = {
  // GET request
  get: async <T = any>(
    url: string,
    params?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse> => {
    const response = await apiClient.get<ApiResponse<T>>(url, {
      params,
      ...config,
    });
    return response.data;
  },

  // POST request
  post: async <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse> => {
    const response = await apiClient.post<ApiResponse<T>>(url, data, config);
    return response.data;
  },

  // PUT request
  put: async <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse> => {
    const response = await apiClient.put<ApiResponse<T>>(url, data, config);
    return response.data;
  },

  // PATCH request
  patch: async <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse> => {
    const response = await apiClient.patch<ApiResponse<T>>(url, data, config);
    return response.data;
  },

  // DELETE request
  delete: async <T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse> => {
    const response = await apiClient.delete<ApiResponse<T>>(url, config);
    return response.data;
  },
};

export default apiClient;
