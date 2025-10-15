import React, { useState, useEffect } from "react";
import Form from "./Form";
import Table from "./Table";
import EmployeeService from "./api/service"; 
function App() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    setPeople(EmployeeService.all());
  }, []);

  const addPerson = (person) => {
    setPeople(EmployeeService.add(person));
  };

  const deletePerson = (id) => {
    setPeople(EmployeeService.delete(id));
  };

  return (
    <div>
      <h1>Список людей</h1>
      <Form onAdd={addPerson} />
      <Table people={people} onDelete={deletePerson} />
    </div>
  );
}

export default App;
