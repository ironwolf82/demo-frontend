import { useProducts } from '../hooks/useProducts';
import { ProductForm } from '../components/ProductForm';
import { ProductList } from '../components/ProductList';

export function ProductsPage() {
  const { products, status, error, addProduct, removeProduct } = useProducts();

  return (
    <section className="page-section">
      <h2 className="section-title">Products</h2>
      <ProductForm onSubmit={addProduct} />
      {status === 'loading' && <p className="status-text">Loading products…</p>}
      {status === 'error' && <p className="status-error">{error}</p>}
      {status === 'success' && <ProductList products={products} onDelete={removeProduct} />}
    </section>
  );
}
