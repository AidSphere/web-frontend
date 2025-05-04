import { ApiErrorResponse } from '@/types/responses';
import { AxiosError } from 'axios';

export const handleApiError = (error: unknown): ApiErrorResponse => {
  if (error instanceof AxiosError && error.response) {
    // Handle Axios errors
    return error.response.data as ApiErrorResponse;
  } else if (error instanceof Error) {
    // Handle regular JavaScript errors
    return {
      timestamp: new Date().toISOString(),
      path: window.location.pathname,
      status: 500,
      error: 'Internal Client Error',
      message: error.message,
    };
  } else {
    // Handle unknown errors
    return {
      timestamp: new Date().toISOString(),
      path: window.location.pathname,
      status: 500,
      error: 'Unknown Error',
      message: 'An unknown error occurred',
    };
  }
};

export const getErrorMessage = (error: unknown): string => {
  const errorResponse = handleApiError(error);
  return errorResponse.message;
};
