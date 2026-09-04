export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  description: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: { data: T[]; pagination: Pagination } | T;
  message?: string;
  timestamp: string;
}

export type Status = 'idle' | 'loading' | 'success' | 'error';
