import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // Redux хуки
import {
  Grid,
  Typography,
  Box,
  Button,
  Alert,
  Snackbar,
  Fab,
  Breadcrumbs,
  Link
} from '@mui/material'; // MUI компоненты
import {
  Refresh,
  RestaurantMenu,
  Home as HomeIcon
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom'; // React Router Link
import { fetchUsers, addDish, deleteDish } from '../store/userSlice'; // Redux экшены
import Loader from '../components/Loader';
import DishForm from '../components/DishForm';
import MenuTable from '../components/MenuTable';
import ImageCrop from '../components/ImageCrop';

// Главная страница с пропсом userRole для определения прав
const Home = ({ userRole }) => {
  const dispatch = useDispatch(); // Redux dispatch для вызова экшенов
  const { dishes, loading, error } = useSelector((state) => state.users); // Redux селектор
  const isAdmin = userRole === 'admin';
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    // Загружаем данные при монтировании (асинхронный экшен)
    dispatch(fetchUsers());
  }, [dispatch]);

  // Обработчик добавления блюда
  const handleAddDish = (newDish) => {
    if (!isAdmin) return;
    
    // Диспатчим экшен добавления блюда
    dispatch(addDish(newDish));
    showSnackbar('Блюдо успешно добавлено!', 'success');
  };

  // Обработчик удаления блюда
  const handleDeleteDish = (id) => {
    if (!isAdmin) return;
    
    // Диспатчим экшен удаления блюда
    dispatch(deleteDish(id));
    showSnackbar('Блюдо удалено', 'info');
  };

  const handleRefresh = () => {
    // Обновляем данные (асинхронный экшен)
    dispatch(fetchUsers());
    showSnackbar('Данные обновлены', 'info');
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <Loader open={loading} message="Загружаем меню..." />
      
      {/* Хлебные крошки для навигации */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
        <Link
          component={RouterLink}
          to="/"
          color="inherit"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Главная
        </Link>
        <Typography color="text.primary">Меню</Typography>
      </Breadcrumbs>
      
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            <RestaurantMenu sx={{ mr: 1, verticalAlign: 'middle' }} />
            {isAdmin ? 'Панель управления меню' : 'Меню шаурмичной'}
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={handleRefresh}
            >
              Обновить
            </Button>
          </Box>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Ошибка загрузки: {error}
          </Alert>
        )}

        {/* MUI Grid система для адаптивной верстки */}
        <Grid container spacing={3}>
          {isAdmin && (
            <Grid item xs={12} md={4}>
              {/* Форма добавления с пропсом onAddDish */}
              <DishForm onAddDish={handleAddDish} />
            </Grid>
          )}
          
          <Grid item xs={12} md={isAdmin ? 8 : 12}>
            {/* Таблица меню с пропсами dishes, onDeleteDish, isAdmin */}
            <MenuTable
              dishes={dishes}
              onDeleteDish={handleDeleteDish}
              isAdmin={isAdmin}
            />
          </Grid>

          {isAdmin && (
            <Grid item xs={12}>
              {/* Компонент обрезки изображений */}
              <ImageCrop />
            </Grid>
          )}
        </Grid>
      </Box>

      {/* MUI Fab (плавающая кнопка) */}
      <Fab
        color="primary"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={handleRefresh}
        title="Обновить данные"
      >
        <Refresh />
      </Fab>

      {/* MUI Snackbar для уведомлений */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Home;