import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Alert,
  Grid,
  Avatar
} from '@mui/material';
import { Lock, Person } from '@mui/icons-material';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Заполните все поля');
      return;
    }

    if (username === 'admin' && password === 'admin123') {
      onLogin('admin');
      navigate('/');
    } else if (username === 'user' && password === 'user123') {
      onLogin('user');
      navigate('/');
    } else {
      setError('Неверные учетные данные');
    }
  };

  const handleDemoLogin = (demoUser) => {
    if (demoUser === 'admin') {
      setUsername('admin');
      setPassword('admin123');
    } else {
      setUsername('user');
      setPassword('user123');
    }
  };

  return (
    <Grid container justifyContent="center" sx={{ mt: 8, mb: 8 }}>
      <Grid item xs={12} md={6} lg={4}>
        <Card elevation={3}>
          <CardContent>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Avatar sx={{ 
                width: 80, 
                height: 80, 
                bgcolor: 'primary.main',
                mx: 'auto',
                mb: 2
              }}>
                <Lock fontSize="large" />
              </Avatar>
              <Typography variant="h4" gutterBottom>
                Вход в систему
              </Typography>
              <Typography color="textSecondary" paragraph>
                Управление меню шаурмичной
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Логин"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                margin="normal"
                required
                InputProps={{
                  startAdornment: <Person sx={{ mr: 1, color: 'action.active' }} />
                }}
              />

              <TextField
                fullWidth
                label="Пароль"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{ mt: 3 }}
              >
                Войти
              </Button>
            </Box>

            <Box sx={{ mt: 3 }}>
              <Typography variant="body2" color="textSecondary" gutterBottom align="center">
                Тестовые аккаунты:
              </Typography>
              
              <Grid container spacing={1} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="outlined"
                    size="small"
                    fullWidth
                    onClick={() => handleDemoLogin('admin')}
                  >
                    Администратор (admin)
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="outlined"
                    size="small"
                    fullWidth
                    onClick={() => handleDemoLogin('user')}
                  >
                    Пользователь (user)
                  </Button>
                </Grid>
              </Grid>
              
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography variant="caption" color="textSecondary">
                  Данные для входа:<br />
                  Админ: admin / admin123<br />
                  Пользователь: user / user123
                </Typography>
              </Box>
            </Box>
          </CardContent>
          
          <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
            <Button 
              size="small" 
              onClick={() => navigate('/about')}
            >
              О нас
            </Button>
            <Button 
              size="small" 
              onClick={() => navigate('/reviews')}
            >
              Отзывы
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;