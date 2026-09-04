import type { Product } from '../types';

interface Props {
  products: Product[];
  onDelete: (id: number) => Promise<void>;
}

export function ProductList({ products, onDelete }: Props) {
  if (products.length === 0) {
    return <p className="empty-state">No products yet. Create one above.</p>;
  }

  return (
    <ul className="item-grid">
      {products.map(product => (
        <li key={product.id} className="item-card">
          <div className="item-info">
            <span className="item-name">{product.name}</span>
            <span className="item-sub">{product.description}</span>
            <div className="item-meta">
              <span className="badge price">${product.price.toFixed(2)}</span>
              <span className="badge neutral">Stock: {product.stock}</span>
            </div>
          </div>
          <button
            className="btn-danger"
            onClick={() => onDelete(product.id)}
            aria-label={`Delete ${product.name}`}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
