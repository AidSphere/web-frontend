import { InternalAxiosRequestConfig } from 'axios';
import { getAccessToken } from '../utils/authUtils';

// Export the interceptor function, not the interceptor instance
export const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  // Get token from localStorage or cookie
  const token = getAccessToken();

  // If token exists, add to headers
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  // Set content type if not already set
  if (!config.headers['Content-Type']) {
    config.headers['Content-Type'] = 'application/json';
  }

  return config;
};

export const requestErrorInterceptor = (error: any) => {
  return Promise.reject(error);
};
