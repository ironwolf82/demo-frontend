import { useUsers } from '../hooks/useUsers';
import { UserForm } from '../components/UserForm';
import { UserList } from '../components/UserList';

export function UsersPage() {
  const { users, status, error, addUser, removeUser } = useUsers();

  return (
    <section className="page-section">
      <h2 className="section-title">Users</h2>
      <UserForm onSubmit={addUser} />
      {status === 'loading' && <p className="status-text">Loading users…</p>}
      {status === 'error' && <p className="status-error">{error}</p>}
      {status === 'success' && <UserList users={users} onDelete={removeUser} />}
    </section>
  );
}
