import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar({ cartCount = 0 }) {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/productos">Productos</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/carrito">Carrito ({cartCount})</Link>
    </nav>
  );
}

