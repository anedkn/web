import React, { useState, useMemo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // React Router
import { ThemeProvider, createTheme } from '@mui/material/styles'; // MUI темы
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import About from './pages/About';
import Reviews from './pages/Reviews';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [mode, setMode] = useState('light');

  // MUI тема (светлая/темная)
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                primary: { main: '#1976d2' },
                secondary: { main: '#dc004e' },
                background: { default: '#f5f5f5', paper: '#ffffff' },
              }
            : {
                primary: { main: '#90caf9' },
                secondary: { main: '#f48fb1' },
                background: { default: '#121212', paper: '#1e1e1e' },
              }),
        },
      }),
    [mode],
  );

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const handleLogin = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        {/* Навбар с пропсами: isLoggedIn, userRole, onLogout, mode, toggleTheme */}
        <NavBar 
          isLoggedIn={isLoggedIn}
          userRole={userRole}
          onLogout={handleLogout}
          mode={mode}
          toggleTheme={toggleTheme}
        />
        
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {/* Маршрутизация React Router */}
          <Routes>
            {/* Публичные маршруты */}
            <Route path="/login" element={
              isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
            } />
            <Route path="/about" element={<About />} />
            <Route path="/reviews" element={<Reviews />} />
            
            {/* Защищенный маршрут через ProtectedRoute */}
            <Route path="/" element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Home userRole={userRole} /> {/* Пропс: userRole для определения прав */}
              </ProtectedRoute>
            } />
            
            {/* Дефолтный маршрут */}
            <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} />} />
          </Routes>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;