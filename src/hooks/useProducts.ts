import { useState, useEffect, useCallback } from 'react';
import { getProducts, createProduct, deleteProduct } from '../services/api';
import type { Product, Status } from '../types';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setStatus('loading');
    setError(null);
    try {
      const res = await getProducts();
      const payload = res.data as { data: Product[] };
      setProducts(payload?.data ?? []);
      setStatus('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products');
      setStatus('error');
    }
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const addProduct = async (payload: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const res = await createProduct(payload);
    const product = res.data as Product;
    setProducts(prev => [product, ...prev]);
    return product;
  };

  const removeProduct = async (id: number) => {
    await deleteProduct(id);
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return { products, status, error, refetch: fetchProducts, addProduct, removeProduct };
}
