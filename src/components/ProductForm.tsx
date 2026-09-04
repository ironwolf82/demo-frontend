import { useState } from 'react';
import type { Product } from '../types';

interface Props {
  onSubmit: (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
}

export function ProductForm({ onSubmit }: Props) {
  const [form, setForm] = useState({ name: '', price: '', stock: '', description: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.name.trim() || !form.price) {
      setError('Name and price are required.');
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({
        name: form.name,
        price: Number(form.price),
        stock: Number(form.stock) || 0,
        description: form.description,
      });
      setForm({ name: '', price: '', stock: '', description: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create product');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="form-card" onSubmit={handleSubmit} noValidate>
      <h3 className="form-title">New Product</h3>
      {error && <p className="form-error">{error}</p>}
      <div className="form-group">
        <label htmlFor="pname">Name</label>
        <input id="pname" name="name" type="text" value={form.name} onChange={handleChange} placeholder="Product name" required />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="price">Price ($)</label>
          <input id="price" name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} placeholder="0.00" required />
        </div>
        <div className="form-group">
          <label htmlFor="stock">Stock</label>
          <input id="stock" name="stock" type="number" min="0" value={form.stock} onChange={handleChange} placeholder="0" />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" value={form.description} onChange={handleChange} placeholder="Optional description" rows={2} />
      </div>
      <button type="submit" className="btn-primary" disabled={submitting}>
        {submitting ? 'Creating…' : 'Create Product'}
      </button>
    </form>
  );
}
