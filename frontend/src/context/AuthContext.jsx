import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [access, setAccess] = useState(() => localStorage.getItem("access") || null);

  useEffect(() => {
    if (access) localStorage.setItem("access", access);
    else localStorage.removeItem("access");
  }, [access]);

  const login = (accessToken) => {
    setAccess(accessToken);
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setAccess(null);
  };

  return (
    <AuthContext.Provider value={{ access, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
