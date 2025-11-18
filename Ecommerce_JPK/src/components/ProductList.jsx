// src/components/ProductList.jsx
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";

export default function ProductList({ onAdd }) {
  const { products, loading, error } = useProducts();

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  if (error) {
    return <p>Hubo un problema: {error}</p>;
  }

  return (
    <ul className="product-list">
      {products.map((p) => {
        const id = p.id;

        return (
          <li key={id} className="product-card">
            {/* Imagen / link al detalle */}
            {p.image && (
              <Link to={`/productos/${id}`}>
                <img src={p.image} alt={p.name} />
              </Link>
            )}

            {/* Nombre */}
            <h3>
              <Link to={`/productos/${id}`}>{p.name}</Link>
            </h3>

            {/* Info y acción */}
            <p>
              ${Number(p.price).toLocaleString()}{" "}
              {p.stock != null && <span>(stock: {p.stock})</span>}
            </p>

            <button
              onClick={() =>
                onAdd({
                  id,
                  name: p.name,
                  price: Number(p.price),
                  image: p.image,    // ← AGREGADO
                })

              }
            >
              Agregar al carrito
            </button>
          </li>
        );
      })}
    </ul>
  );
}
