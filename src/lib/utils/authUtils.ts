// Utility functions for authentication

export const getAccessToken = (): string | null => {
  // Get token from localStorage
  return localStorage.getItem('accessToken');
};

export const setAccessToken = (token: string): void => {
  localStorage.setItem('accessToken', token);
};

export const removeAccessToken = (): void => {
  localStorage.removeItem('accessToken');
};

export const isAuthenticated = (): boolean => {
  return !!getAccessToken();
};
