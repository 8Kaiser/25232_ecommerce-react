import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Al montar, revisa si hay token guardado
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const savedUser = localStorage.getItem("authUser");

    if (token && savedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // login con usuario y contraseña
  const login = (username, password) => {
    // credenciales fijas para la tarea
    if (username === "admin" && password === "1234") {
      const userData = { username: "admin", role: "admin" };

      setIsAuthenticated(true);
      setUser(userData);

      // “token” simulado
      localStorage.setItem("authToken", "fake-admin-token");
      localStorage.setItem("authUser", JSON.stringify(userData));

      return { ok: true };
    }

    // credenciales incorrectas
    return { ok: false, message: "Usuario o contraseña incorrectos" };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
  };

  const value = useMemo(
    () => ({ isAuthenticated, user, login, logout }),
    [isAuthenticated, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
