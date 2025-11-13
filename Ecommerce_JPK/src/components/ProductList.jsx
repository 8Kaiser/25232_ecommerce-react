// src/components/ProductList.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "https://68d55af5e29051d1c0ae5170.mockapi.io/api/v1/products";

export default function ProductList({ onAdd }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(API_URL, { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, []);

  if (loading) return <p>Cargando productos…</p>;
  if (error)   return <p>Error al cargar: {error}</p>;
  if (!products.length) return <p>Sin productos.</p>;

  return (
    <ul className="products">
      {products.map((p) => {
        const id = String(p.id); // MockAPI trae id como string

        return (
          <li key={id} className="product">
            {/* Card clickeable al detalle */}
            <Link to={`/productos/${p.id}`} className="product-link">
            
              {p.image && <img src={p.image} alt={p.name} width={120} />}
              <h4>{p.name}</h4>
            </Link>

            {/* Info y acción */}
            <p>
              ${Number(p.price).toLocaleString()} (stock: {p.stock ?? "-"})
            </p>
            <button onClick={() => onAdd({ id, name: p.name, price: Number(p.price) })}>
              Agregar al carrito
            </button>
          </li>
        );
      })}
    </ul>
  );
}
