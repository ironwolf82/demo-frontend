import { useState } from 'react';
import { UsersPage } from './pages/UsersPage';
import { ProductsPage } from './pages/ProductsPage';
import './styles/global.css';

type Tab = 'users' | 'products';

export default function App() {
  const [tab, setTab] = useState<Tab>('users');

  return (
    <div className="app-shell">
      <header className="app-header">
        <span className="app-logo">demo<span>.</span>front</span>
        <nav className="app-nav">
          <button
            className={`nav-btn${tab === 'users' ? ' active' : ''}`}
            onClick={() => setTab('users')}
          >
            Users
          </button>
          <button
            className={`nav-btn${tab === 'products' ? ' active' : ''}`}
            onClick={() => setTab('products')}
          >
            Products
          </button>
        </nav>
      </header>
      <main className="app-main">
        {tab === 'users' ? <UsersPage /> : <ProductsPage />}
      </main>
    </div>
  );
}
