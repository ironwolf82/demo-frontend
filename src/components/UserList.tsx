import type { User } from '../types';

interface Props {
  users: User[];
  onDelete: (id: number) => Promise<void>;
}

export function UserList({ users, onDelete }: Props) {
  if (users.length === 0) {
    return <p className="empty-state">No users yet. Create one above.</p>;
  }

  return (
    <ul className="item-grid">
      {users.map(user => (
        <li key={user.id} className="item-card">
          <div className="item-info">
            <span className="item-name">{user.name}</span>
            <span className="item-sub">{user.email}</span>
            <span className="badge">{user.role}</span>
          </div>
          <button
            className="btn-danger"
            onClick={() => onDelete(user.id)}
            aria-label={`Delete ${user.name}`}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
