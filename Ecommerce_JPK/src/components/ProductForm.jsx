// src/components/ProductForm.jsx
import { useEffect, useState } from "react";
import { useProducts } from "../context/ProductsContext";

const EMPTY_PRODUCT = {
  name: "",
  price: "",
  description: "",
  image: "",
  stock: "",
};

export default function ProductForm({ productoSeleccionado, onFinish }) {
  const { agregarProducto, editarProducto } = useProducts();
  const [producto, setProducto] = useState(EMPTY_PRODUCT);
  const [errors, setErrors] = useState({});

  const modoEdicion = Boolean(productoSeleccionado);

  // Cuando cambie el seleccionado, rellenar el form
  useEffect(() => {
    if (productoSeleccionado) {
      setProducto(productoSeleccionado);
    } else {
      setProducto(EMPTY_PRODUCT);
    }
  }, [productoSeleccionado]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto((prev) => ({ ...prev, [name]: value }));
  };

  // Validaciones según la consigna
  const validar = () => {
    const newErrors = {};

    if (!producto.name.trim()) {
      newErrors.name = "El nombre es obligatorio.";
    }

    if (!producto.price || Number(producto.price) <= 0) {
      newErrors.price = "El precio debe ser mayor a 0.";
    }

    if (!producto.description || producto.description.length < 10) {
      newErrors.description =
        "La descripción debe tener al menos 10 caracteres.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validar()) return;

    if (modoEdicion) {
      await editarProducto(producto);
    } else {
      await agregarProducto(producto);
    }

    if (onFinish) onFinish(); // para limpiar selección en Admin
    setProducto(EMPTY_PRODUCT);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <h2>{modoEdicion ? "Editar producto" : "Agregar producto"}</h2>

      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="name"
          value={producto.name}
          onChange={handleChange}
          required
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
      </div>

      <div>
        <label>Precio:</label>
        <input
          type="number"
          name="price"
          value={producto.price}
          onChange={handleChange}
          required
          min="0"
        />
        {errors.price && <p style={{ color: "red" }}>{errors.price}</p>}
      </div>

      <div>
        <label>Stock:</label>
        <input
          type="number"
          name="stock"
          value={producto.stock}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Imagen (URL):</label>
        <input
          type="text"
          name="image"
          value={producto.image}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Descripción:</label>
        <textarea
          name="description"
          value={producto.description}
          onChange={handleChange}
          required
        />
        {errors.description && (
          <p style={{ color: "red" }}>{errors.description}</p>
        )}
      </div>

      <button type="submit">
        {modoEdicion ? "Actualizar producto" : "Crear producto"}
      </button>
    </form>
  );
}
