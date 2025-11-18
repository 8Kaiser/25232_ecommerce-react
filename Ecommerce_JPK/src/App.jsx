import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ItemDetailContainer from "./components/ItemDetailContainer"; // ⬅ Asegúrate que este exista
import About from "./pages/About";
import Contact from "./pages/Contact";
import { useState } from "react";
import './App.css';



function App() {
  const [cartItems, setCartItems] = useState([]);

  const handleAdd = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      return existing
        ? prev.map((i) =>
            i.id === item.id ? { ...i, qty: i.qty + 1 } : i
          )
        : [...prev, { ...item, qty: 1 }];
    });
  };

  const handleInc = (id) =>
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i))
    );

  const handleDec = (id) =>
    setCartItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, qty: Math.max(i.qty - 1, 1) } : i
      )
    );

  const handleRemove = (id) =>
    setCartItems((prev) => prev.filter((i) => i.id !== id));

  const handleClear = () => setCartItems([]);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    
    <><div className="page-container">
      <Header />
      <Navbar cartCount={cartItems.length} />
      <Routes>
        <Route
          path="/"
          element={
            <div style={{ display: "flex", gap: "40px" }}>
              <ProductList onAdd={handleAdd} />
              <Cart
                items={cartItems}
                total={total}
                onInc={handleInc}
                onDec={handleDec}
                onRemove={handleRemove}
                onClear={handleClear}
              />
            </div>
          }
        />
        <Route
          path="/productos"
          element={
            <div style={{ display: "flex", gap: "40px" }}>
              <ProductList onAdd={handleAdd} />
              <Cart
                items={cartItems}
                total={total}
                onInc={handleInc}
                onDec={handleDec}
                onRemove={handleRemove}
                onClear={handleClear}
              />
            </div>
          }
        />
        <Route path="/productos/:id" element={<ItemDetailContainer />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        

        {/* RUTAS PROTEGIDAS */}
        <Route
          path="/carrito"
          element={
            <ProtectedRoute>
      <Cart
        items={cartItems}
        total={total}
        onInc={handleInc}
        onDec={handleDec}
        onRemove={handleRemove}
        onClear={handleClear}
      />
    </ProtectedRoute>
  }
  
/>

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* 404 simple (opcional) */}
        <Route path="*" element={<div style={{padding:24}}>No encontrado</div>} />
      </Routes>
      <Footer />
      </div>
    </>
  );
}

export default App;
