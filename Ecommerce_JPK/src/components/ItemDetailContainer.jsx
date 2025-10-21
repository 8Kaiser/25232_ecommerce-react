import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// ItemDetail.jsx
import './ItemDetail.css'; // ← esto es obligatorio si tenés un archivo CSS


export default function ItemDetailContainer() {
  const { id } = useParams(); // <- ID como string
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://68d55af5e29051d1c0ae5170.mockapi.io/api/v1/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Producto no encontrado (${res.status})`);
        return res.json();
      })
      .then((data) => {
        setProducto(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar el producto:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (!producto) return <p>Producto no encontrado.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Detalle del Producto</h2>
      <img src={producto.image} alt={producto.name} width="200" />
      <h3>{producto.name}</h3>
      <p>Precio: ${producto.price}</p>
      <p>Stock: {producto.stock}</p>
      <p>{producto.description}</p>
      <button>Agregar al carrito</button>
    </div>
  );
}
