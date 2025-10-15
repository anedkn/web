import React, { useState } from "react";

function Form({ onAdd }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !age) return;

    const newPerson = {
      id: Date.now(), 
      name,
      age: Number(age),
    };

    onAdd(newPerson);
    setName("");
    setAge("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Возраст"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <button type="submit">Добавить</button>
    </form>
  );
}

export default Form;
