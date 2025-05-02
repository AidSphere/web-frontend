import { AxiosResponse, AxiosError } from 'axios';

import apiClient from '../apiClient';
import { refreshAccessToken } from '@/services/api/authService';

export const responseInterceptor = (response: AxiosResponse) => {
  // Process successful responses
  return response;
};

export const responseErrorInterceptor = async (error: AxiosError) => {
  const originalRequest = error.config as any;

  // Handle 401 Unauthorized errors (token expired)
  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    try {
      // Attempt to refresh the token
      // const newToken = await refreshAccessToken();

      // if (newToken) {
      //   // Update the auth header with new token
      //   originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
      //   // Retry the original request
      //   return apiClient(originalRequest);
      // }

      // temporarily till refresh token is implemented (remove this)
      // Redirect to login
      window.location.href = '/auth';
      return Promise.reject(error);
    } catch (refreshError) {
      // Handle refresh token failure (redirect to login, etc.)
      // You might want to dispatch a logout action here
      window.location.href = '/auth';
      return Promise.reject(refreshError);
    }
  }

  // Handle other errors
  return Promise.reject(error);
};
