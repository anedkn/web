import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/actions"; // исправленный путь

export default function TestComponent() {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state);

  const handleClick = () => {
    dispatch(fetchData((result) => {
      console.log("Колбэк получил:", result);
    }));
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <button onClick={handleClick}>Запросить данные</button>
      {loading && <p>Загрузка...</p>}
      {data && <p>{data.message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
