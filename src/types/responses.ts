// Pagination interface from backend
export interface Pagination {
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
  isFirst: boolean;
}

// Generic API response interface matching the backend structure
export interface ApiResponse<T = any> {
  timestamp: string;
  status: number;
  data: T;
  message: string;
  error?: string;
  path?: string;
  pagination?: Pagination;
}

// Generic API error response interface
export interface ApiErrorResponse {
  timestamp: string;
  path: string;
  status: number;
  error: string;
  message: string;
}
