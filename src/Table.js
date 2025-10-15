import React from "react";

function Table({ people, onDelete }) {
  return (
    <table border="1" cellPadding="5">
      <thead>
        <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Действие</th>
        </tr>
      </thead>
      <tbody>
        {people.map((person) => (
          <tr key={person.id}>
            <td>{person.name}</td>
            <td>{person.age}</td>
            <td>
              <button onClick={() => onDelete(person.id)}>Удалить</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
