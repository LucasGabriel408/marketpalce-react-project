import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchProductById } from '../api/fakestore';

export default function ProductDetail() {
  const { id } = useParams();
  // Local state for product details and request status
  const [product, setProduct] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const currency = React.useMemo(() => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }), []);

  React.useEffect(() => {
    // Cancel request when id changes/unmounts
    const controller = new AbortController();
    const { signal } = controller;
    async function load() {
      setLoading(true);
      setError('');
      try {
        const data = await fetchProductById(id, { signal });
        setProduct(data);
      } catch (e) {
        if (e.name !== 'CanceledError' && e.name !== 'AbortError') {
          setError(e.message || 'Erro ao carregar produto');
        }
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => controller.abort();
  }, [id]);

  if (loading) return (
    <div className="container spinner-wrap">
      <div className="spinner" />
    </div>
  );
  if (error) return <p className="container" style={{ color: 'red' }}>{error}</p>;
  if (!product) return null;

  return (
    <div className="container detail">
      <Link to="/" className="back-link">← Voltar</Link>
      <div className="detail-grid">
        <div>
          <img src={product.image} alt={product.title} className="detail-image" loading="lazy" />
        </div>
        <div>
          <h1 className="detail-title">{product.title}</h1>
          <p><strong>Categoria:</strong> {product.category}</p>
          <p className="price" style={{ fontSize: 20 }}>{currency.format(product.price)}</p>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
}


