import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login({ username, password });
    if (res.ok) navigate(from, { replace: true });
    else alert("Ошибка входа: " + (res.error || "неизвестно"));
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 420, margin: "32px auto" }}>
      <h3>Вход</h3>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Логин" required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Пароль" required />
      <button type="submit" style={{ marginTop: 8 }}>Войти</button>
    </form>
  );
}
