import React, { createContext, useState, useEffect, useCallback } from "react";
import EmployeeService from "../api/service";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("user")); } catch { return null; }
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, [token, user]);

  const login = useCallback(async (credentials) => {
    const res = EmployeeService.login(credentials);
    const data = res?.data || res;
    if (!data || data.error) return { ok: false, error: data?.error || "Ошибка входа" };
    const receivedToken = data.token;
    const receivedUser = data.user;
    if (!receivedToken) return { ok: false, error: "Токен не получен" };
    setToken(receivedToken);
    setUser(receivedUser);
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
