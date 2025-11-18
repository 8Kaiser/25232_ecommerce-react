import { useAuth } from "../auth/AuthContext";

export default function Header({ count = 0 }) {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div>
        <h1>Talento Tech Merch</h1>
        <div style={{ opacity: 0.7 }}>
          {count > 0 ? `🛒 ${count} ítem(s)` : "🛒 vacío"}
        </div>
      </div>

      <div>
        {isAuthenticated ? (
          <button onClick={logout}>Cerrar sesión</button>
        ) : (
          <a href="/login">Iniciar sesión</a>
        )}
      </div>
    </header>
  );
}
