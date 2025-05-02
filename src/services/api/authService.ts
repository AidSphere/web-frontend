import { ApiResponse } from '@/types/responses';
import apiClient from '@/lib/apiClient';
import { removeAccessToken, setAccessToken } from '@/lib/utils/authUtils';

interface AuthResponse {
  accessToken: string;
  refreshToken?: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      '/auth/login',
      {
        email,
        password,
      }
    );

    if (response.data.data.accessToken) {
      setAccessToken(response.data.data.accessToken);
    }

    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await apiClient.post('/auth/logout');
    removeAccessToken();
  } catch (error) {
    // Still remove token even if logout API fails
    removeAccessToken();
    throw error;
  }
};

export const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const response =
      await apiClient.post<ApiResponse<{ accessToken: string }>>(
        '/auth/refresh'
      );
    const newToken = response.data.data.accessToken;

    if (newToken) {
      setAccessToken(newToken);
      return newToken;
    }

    return null;
  } catch (error) {
    removeAccessToken();
    throw error;
  }
};
