import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext"; // ← ajusta el path según tu estructura

export default function Navbar({ cartCount = 0 }) {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/productos">Productos</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/carrito">Carrito ({cartCount})</Link>

      <span style={{ marginLeft: "auto" }}>
        {isAuthenticated ? (
          <button onClick={logout}>Cerrar sesión</button>
        ) : (
          <Link to="/login">Iniciar sesión</Link>
        )}
      </span>
    </nav>
  );
}
