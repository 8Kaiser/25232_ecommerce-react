import { useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // ⬅️ importante: calculamos "from" ANTES de la redirección
  const from = location.state?.from?.pathname || "/";

  // 👇 si ya estoy autenticado, voy a donde venía, o a "/" por defecto
  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = login(username, password);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    setError("");
    // si vengo de una ruta protegida → vuelvo ahí (admin, carrito, etc.)
    navigate(from, { replace: true });
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Iniciar sesión</h2>

      <form onSubmit={handleSubmit} style={{ maxWidth: 320, marginTop: 16 }}>
        <div style={{ marginBottom: 12 }}>
          <label htmlFor="username">Usuario</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        {error && (
          <p style={{ color: "red", marginBottom: 12 }}>{error}</p>
        )}

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
