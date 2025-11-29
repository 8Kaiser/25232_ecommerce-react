// src/components/ProductForm.jsx
import { useState, useEffect } from "react";
import { uploadToImgbb } from "../services/uploadImage";
import { useProducts } from "../context/ProductsContext";

export default function ProductForm({ productoSeleccionado, onFinish }) {
  const { agregarProducto, editarProducto } = useProducts();

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    image: "",
  });

  const [file, setFile] = useState(null);

  // 🟦 Cargar datos si estamos editando
  useEffect(() => {
    if (productoSeleccionado) {
      setForm({
        name: productoSeleccionado.name || "",
        price: productoSeleccionado.price || "",
        stock: productoSeleccionado.stock || "",
        description: productoSeleccionado.description || "",
        image: productoSeleccionado.image || "",
      });
    } else {
      setForm({
        name: "",
        price: "",
        stock: "",
        description: "",
        image: "",
      });
      setFile(null);
    }
  }, [productoSeleccionado]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let finalImageUrl = form.image;

      // 🟦 Si hay archivo seleccionado, subirlo a imgbb
      if (file) {
        finalImageUrl = await uploadToImgbb(file);
      }

      // Datos comunes (sin id)
      const baseData = {
        name: form.name,
        price: form.price,
        stock: form.stock,
        description: form.description,
        image: finalImageUrl,
      };

      if (productoSeleccionado) {
        // 🟣 EDITAR: conservar id y demás campos originales
        const productoFinal = {
          ...productoSeleccionado, // acá viene el id
          ...baseData,             // pisamos con lo editado
        };

        await editarProducto(productoFinal);
      } else {
        // 🟢 CREAR NUEVO
        await agregarProducto(baseData);
      }

      alert("Producto guardado con éxito ✨");

      // RESET GENERAL
      setForm({
        name: "",
        price: "",
        stock: "",
        description: "",
        image: "",
      });
      setFile(null);

      onFinish?.();

    } catch (err) {
      console.error(err);
      alert("❌ Error al guardar el producto");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
      <h2>{productoSeleccionado ? "Editar producto" : "Agregar producto"}</h2>

      <label>Nombre:</label>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        required
      />

      <label>Precio:</label>
      <input
        type="number"
        name="price"
        value={form.price}
        onChange={handleChange}
        required
      />

      <label>Stock:</label>
      <input
        type="number"
        name="stock"
        value={form.stock}
        onChange={handleChange}
        required
      />

      <label>Imagen:</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <label>Descripción:</label>
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
      />

      <button type="submit">
        {productoSeleccionado ? "Guardar cambios" : "Crear producto"}
      </button>
    </form>
  );
}
