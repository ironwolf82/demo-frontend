import { useState, useEffect, useCallback } from 'react';
import { getUsers, createUser, deleteUser } from '../services/api';
import type { User, Status } from '../types';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setStatus('loading');
    setError(null);
    try {
      const res = await getUsers();
      const payload = res.data as { data: User[] };
      setUsers(payload?.data ?? []);
      setStatus('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load users');
      setStatus('error');
    }
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const addUser = async (payload: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => {
    const res = await createUser(payload);
    const user = res.data as User;
    setUsers(prev => [user, ...prev]);
    return user;
  };

  const removeUser = async (id: number) => {
    await deleteUser(id);
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  return { users, status, error, refetch: fetchUsers, addUser, removeUser };
}
