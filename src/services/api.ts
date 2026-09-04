import axios from 'axios';
import type { User, Product, ApiResponse } from '../types';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 8000,
  headers: { 'Content-Type': 'application/json' },
});

client.interceptors.response.use(
  res => res,
  err => {
    const message = err.response?.data?.message || err.message || 'Network error';
    return Promise.reject(new Error(message));
  }
);

// Users
export const getUsers = () =>
  client.get<ApiResponse<User>>('/users').then(r => r.data);

export const getUserById = (id: number) =>
  client.get<ApiResponse<User>>(`/users/${id}`).then(r => r.data);

export const createUser = (payload: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) =>
  client.post<ApiResponse<User>>('/users', payload).then(r => r.data);

export const updateUser = (id: number, payload: Partial<Omit<User, 'id' | 'createdAt'>>) =>
  client.put<ApiResponse<User>>(`/users/${id}`, payload).then(r => r.data);

export const deleteUser = (id: number) =>
  client.delete<ApiResponse<null>>(`/users/${id}`).then(r => r.data);

// Products
export const getProducts = () =>
  client.get<ApiResponse<Product>>('/products').then(r => r.data);

export const createProduct = (payload: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) =>
  client.post<ApiResponse<Product>>('/products', payload).then(r => r.data);

export const deleteProduct = (id: number) =>
  client.delete<ApiResponse<null>>(`/products/${id}`).then(r => r.data);
