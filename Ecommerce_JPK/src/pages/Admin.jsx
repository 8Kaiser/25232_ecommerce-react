// src/pages/Admin.jsx
import { useState } from "react";
import { useProducts } from "../context/ProductsContext";
import ProductForm from "../components/ProductForm";
import { useAuth } from "../auth/AuthContext";

export default function Admin() {
  const { products, eliminarProducto } = useProducts();
  const { logout } = useAuth(); // ⬅ Necesario para cerrar sesión del admin
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const handleEditarClick = (producto) => {
    setProductoSeleccionado(producto);
  };

  const handleFinishForm = () => {
    setProductoSeleccionado(null);
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Panel de administración</h1>

      {/* Botón para cerrar sesión SOLO en admin */}
      <button 
        onClick={logout}
        style={{
          padding: "8px 16px",
          background: "#ff4444",
          border: "none",
          color: "white",
          cursor: "pointer",
          borderRadius: "4px",
          marginBottom: "20px"
        }}
      >
        Cerrar sesión
      </button>

      {/* Formulario agregar/editar */}
      <ProductForm
        productoSeleccionado={productoSeleccionado}
        onFinish={handleFinishForm}
      />

      {/* Lista de productos para editar / eliminar */}
      <section style={{ marginTop: 32 }}>
        <h2>Productos existentes</h2>

        {products.length === 0 ? (
          <p>No hay productos cargados.</p>
        ) : (
          <ul>
            {products.map((p) => (
              <li key={p.id} style={{ marginBottom: 8 }}>
                <strong>{p.name}</strong> — ${Number(p.price).toLocaleString()}
                <button
                  style={{ marginLeft: 8 }}
                  onClick={() => handleEditarClick(p)}
                >
                  Editar
                </button>
                <button
                  style={{ marginLeft: 8 }}
                  onClick={() => eliminarProducto(p.id)}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
