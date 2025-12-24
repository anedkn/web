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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Avatar
} from '@mui/material';
import { Lock, Person, AdminPanelSettings, People } from '@mui/icons-material';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!username.trim()) {
      newErrors.username = 'Введите логин';
    } else if (username.length < 3) {
      newErrors.username = 'Логин должен быть не менее 3 символов';
    }
    
    if (!password) {
      newErrors.password = 'Введите пароль';
    } else if (password.length < 6) {
      newErrors.password = 'Пароль должен быть не менее 6 символов';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Простая проверка логина
    if (username === 'admin' && password === 'admin123' && role === 'admin') {
      onLogin('admin');
      navigate('/');
    } else if (username === 'user' && password === 'user123' && role === 'user') {
      onLogin('user');
      navigate('/');
    } else {
      setErrors({ 
        general: 'Неверный логин или пароль. Попробуйте admin/admin123 или user/user123' 
      });
    }
  };

  const handleDemoLogin = (demoRole) => {
    if (demoRole === 'admin') {
      setUsername('admin');
      setPassword('admin123');
      setRole('admin');
      setErrors({});
    } else {
      setUsername('user');
      setPassword('user123');
      setRole('user');
      setErrors({});
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

            {errors.general && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {errors.general}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <FormControl fullWidth margin="normal" error={!!errors.role}>
                <InputLabel>Роль</InputLabel>
                <Select
                  value={role}
                  label="Роль"
                  onChange={(e) => {
                    setRole(e.target.value);
                    setErrors({...errors, role: undefined});
                  }}
                  startAdornment={
                    role === 'admin' ? 
                      <AdminPanelSettings sx={{ mr: 1, color: 'primary.main' }} /> : 
                      <People sx={{ mr: 1, color: 'primary.main' }} />
                  }
                >
                  <MenuItem value="admin">
                    <Box display="flex" alignItems="center">
                      <AdminPanelSettings sx={{ mr: 1 }} />
                      Администратор
                    </Box>
                  </MenuItem>
                  <MenuItem value="user">
                    <Box display="flex" alignItems="center">
                      <People sx={{ mr: 1 }} />
                      Пользователь
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Логин"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setErrors({...errors, username: undefined});
                }}
                margin="normal"
                required
                error={!!errors.username}
                helperText={errors.username}
                InputProps={{
                  startAdornment: <Person sx={{ mr: 1, color: 'action.active' }} />
                }}
              />

              <TextField
                fullWidth
                label="Пароль"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors({...errors, password: undefined});
                }}
                margin="normal"
                required
                error={!!errors.password}
                helperText={errors.password}
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
                    startIcon={<AdminPanelSettings />}
                  >
                    Администратор
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="outlined"
                    size="small"
                    fullWidth
                    onClick={() => handleDemoLogin('user')}
                    startIcon={<People />}
                  >
                    Пользователь
                  </Button>
                </Grid>
              </Grid>
              
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography variant="caption" color="textSecondary">
                  Логин: admin / user<br />
                  Пароль: admin123 / user123
                </Typography>
              </Box>
            </Box>
          </CardContent>
          
          <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
            <Typography variant="caption" color="text.secondary">
              Простая валидация: логин (мин. 3 символа), пароль (мин. 6 символов)
            </Typography>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;