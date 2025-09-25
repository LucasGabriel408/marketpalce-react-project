import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { fetchProducts, fetchCategories, fetchProductsByCategory } from '../api/fakestore';

export default function ProductsList() {
  // Local state to store products, categories and loading/error flags
  const [products, setProducts] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || '';
  // Memoized currency formatter reused across renders
  const currency = React.useMemo(() => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }), []);

  React.useEffect(() => {
    // AbortController cancels in-flight requests when category changes/unmounts
    const controller = new AbortController();
    const { signal } = controller;
    async function load() {
      setLoading(true);
      setError('');
      try {
        // Load categories and products concurrently
        const [cats, prods] = await Promise.all([
          fetchCategories({ signal }),
          category ? fetchProductsByCategory(category, { signal }) : fetchProducts({ signal })
        ]);
        setCategories(cats);
        setProducts(prods);
      } catch (e) {
        if (e.name !== 'CanceledError' && e.name !== 'AbortError') {
          setError(e.message || 'Erro ao carregar dados');
        }
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => controller.abort();
  }, [category]);

  function onCategoryChange(e) {
    const value = e.target.value;
    if (value) setSearchParams({ category: value });
    else setSearchParams({});
  }

  if (loading) return (
    <div className="container spinner-wrap">
      <div className="spinner" />
    </div>
  );
  if (error) return <p className="container" style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="container">
      <h1 style={{ marginBottom: 8 }}>Produtos</h1>
      <div className="toolbar">
        <label htmlFor="category" className="nav-link">Categoria:</label>
        <select id="category" value={category} onChange={onCategoryChange} className="select">
          <option value="">Todas</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <ul className="grid">
        {products.map((p) => (
          <li key={p.id} className="card">
            <Link to={`/products/${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <img src={p.image} alt={p.title} loading="lazy" />
              <h3>{p.title}</h3>
              <p className="price">{currency.format(p.price)}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}


