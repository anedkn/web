import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, AuthContext } from "./auth/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Form from "./Form";
import Table from "./Table";
import EmployeeService from "./api/service";
import Login from "./pages/Login";
import About from "./pages/About";
import NavBar from "./components/NavBar";

// Redux тестовый компонент
import TestComponent from "./components/TestComponent";

function PeoplePage() {
  const [people, setPeople] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setPeople(EmployeeService.all());
  }, []);

  const addPerson = (person) => {
    if (user?.role !== "admin") return;
    setPeople(EmployeeService.add(person));
  };

  const deletePerson = (id) => {
    if (user?.role !== "admin") return;
    setPeople(EmployeeService.delete(id));
  };

  return (
    <div style={{ padding: "16px" }}>
      <h1>Список людей</h1>
      {user?.role === "admin" && <p>Вы админ — можете добавлять и удалять</p>}
      {user?.role === "user" && <p>Вы пользователь — только просмотр</p>}
      <Form onAdd={addPerson} />
      <Table people={people} onDelete={deletePerson} />

      {/* Вставляем тестовый компонент Redux */}
      <TestComponent />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <PeoplePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
