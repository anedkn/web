import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box,
  IconButton,
  Switch,
  Menu,
  MenuItem,
  Avatar,
  useTheme
} from '@mui/material';
import {
  Brightness4,
  Brightness7,
  Restaurant,
  Menu as MenuIcon,
  Person,
  Info,
  RateReview,
  ExitToApp
} from '@mui/icons-material';

const NavBar = ({ isLoggedIn, userRole, onLogout, mode, toggleTheme }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
    handleMenuClose();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>
        
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem component={RouterLink} to="/" onClick={handleMenuClose}>
            <Restaurant sx={{ mr: 1 }} /> Главная
          </MenuItem>
          <MenuItem component={RouterLink} to="/about" onClick={handleMenuClose}>
            <Info sx={{ mr: 1 }} /> Контакты
          </MenuItem>
          <MenuItem component={RouterLink} to="/reviews" onClick={handleMenuClose}>
            <RateReview sx={{ mr: 1 }} /> Отзывы
          </MenuItem>
        </Menu>

        <Restaurant sx={{ mr: 1 }} />
        <Typography variant="h6" component={RouterLink} to="/" sx={{ 
          flexGrow: 1, 
          textDecoration: 'none', 
          color: 'inherit',
          fontWeight: 'bold'
        }}>
          Шаурмичная
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Brightness7 sx={{ color: mode === 'light' ? 'yellow' : 'inherit' }} />
            <Switch
              checked={mode === 'dark'}
              onChange={toggleTheme}
              color="default"
            />
            <Brightness4 sx={{ color: mode === 'dark' ? 'primary.main' : 'inherit' }} />
          </Box>
          
          {isLoggedIn ? (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar sx={{ 
                  width: 32, 
                  height: 32, 
                  bgcolor: userRole === 'admin' ? 'secondary.main' : 'primary.main' 
                }}>
                  <Person />
                </Avatar>
                <Typography variant="body2">
                  {userRole === 'admin' ? '👑 Админ' : '👤 Пользователь'}
                </Typography>
              </Box>
              
              <Button
                color="inherit"
                startIcon={<ExitToApp />}
                onClick={handleLogout}
                sx={{ ml: 2 }}
              >
                Выйти
              </Button>
            </>
          ) : (
            <>
              <Button 
                color="inherit" 
                component={RouterLink} 
                to="/about"
                sx={{ display: { xs: 'none', sm: 'block' } }}
              >
                Контакты
              </Button>
              <Button 
                color="inherit" 
                component={RouterLink} 
                to="/reviews"
                sx={{ display: { xs: 'none', sm: 'block' } }}
              >
                Отзывы
              </Button>
              <Button 
                color="inherit" 
                component={RouterLink} 
                to="/login"
                variant="outlined"
                sx={{ ml: 2 }}
              >
                Войти
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;