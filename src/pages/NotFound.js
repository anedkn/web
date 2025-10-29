import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <h1>404 — Не найдено</h1>
      <p>Страница не найдена. <Link to="/">Вернуться на главную</Link></p>
    </div>
  );
}
