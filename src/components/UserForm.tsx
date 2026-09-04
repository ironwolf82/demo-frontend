import { useState } from 'react';
import type { User } from '../types';

interface Props {
  onSubmit: (data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
}

const ROLES = ['Engineer', 'Designer', 'Manager', 'QA', 'DevOps', 'User'];

export function UserForm({ onSubmit }: Props) {
  const [form, setForm] = useState({ name: '', email: '', role: 'User' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.name.trim() || !form.email.trim()) {
      setError('Name and email are required.');
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit(form);
      setForm({ name: '', email: '', role: 'User' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create user');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="form-card" onSubmit={handleSubmit} noValidate>
      <h3 className="form-title">New User</h3>
      {error && <p className="form-error">{error}</p>}
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="Full name" required />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="user@example.com" required />
      </div>
      <div className="form-group">
        <label htmlFor="role">Role</label>
        <select id="role" name="role" value={form.role} onChange={handleChange}>
          {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>
      <button type="submit" className="btn-primary" disabled={submitting}>
        {submitting ? 'Creating…' : 'Create User'}
      </button>
    </form>
  );
}
