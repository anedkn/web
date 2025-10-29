import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

export default function NavBar() {
  const { token, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={{ padding: "8px", background: "#eee", display: "flex", justifyContent: "space-between" }}>
      <div>
        <Link to="/">Главная</Link>{" | "}
        <Link to="/about">О проекте</Link>
      </div>
      <div>
        {token ? (
          <>
            <span style={{ marginRight: "12px" }}>👤 {user?.username}</span>
            <button onClick={handleLogout}>Выйти</button>
          </>
        ) : (
          <Link to="/login">Войти</Link>
        )}
      </div>
    </nav>
  );
}
