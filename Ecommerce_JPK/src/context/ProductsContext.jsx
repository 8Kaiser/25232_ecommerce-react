// src/context/ProductsContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const ProductsContext = createContext();

const API_URL =
  "https://68d55af5e29051d1c0ae5170.mockapi.io/api/v1/products"; // tu MockAPI

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);

  // 👉 Cargar productos al iniciar
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(API_URL);
      if (!res.ok) {
        throw new Error("Error al cargar los productos");
      }

      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
      alert("Hubo un problema al cargar los productos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 👉 AGREGAR producto (POST)
  const agregarProducto = async (productoNuevo) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productoNuevo),
      });

      if (!res.ok) {
        throw new Error("Error al crear el producto.");
      }

      const data = await res.json();
      setProducts((prev) => [...prev, data]);
      alert("Producto creado correctamente.");
    } catch (error) {
      console.error(error.message);
      alert("Hubo un problema al crear el producto.");
    }
  };

  // 👉 EDITAR producto (PUT) – muy parecido al ejemplo de la lámina
  const editarProducto = async (producto) => {
    try {
      const res = await fetch(`${API_URL}/${producto.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(producto),
      });

      if (!res.ok) {
        throw new Error("Error al actualizar el producto.");
      }

      const data = await res.json();

      // actualizar en el estado global
      setProducts((prev) =>
        prev.map((p) => (p.id === data.id ? data : p))
      );

      alert("Producto actualizado correctamente.");
    } catch (error) {
      console.error(error.message);
      alert("Hubo un problema al actualizar el producto.");
    }
  };

  // 👉 ELIMINAR producto (DELETE) – como en la lámina
  const eliminarProducto = async (id) => {
    const confirmar = window.confirm(
      "¿Estás seguro de que deseas eliminar este producto?"
    );
    if (!confirmar) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Error al eliminar el producto.");
      }

      // quitar del estado global
      setProducts((prev) => prev.filter((p) => p.id !== id));

      alert("Producto eliminado correctamente.");
    } catch (error) {
      console.error(error.message);
      alert("Hubo un problema al eliminar el producto.");
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        error,
        agregarProducto,
        editarProducto,
        eliminarProducto,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export const useProducts = () => useContext(ProductsContext);
