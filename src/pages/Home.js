import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Grid,
  Typography,
  Box,
  Alert,
  Snackbar,
  Fab
} from '@mui/material';
import {
  Refresh,
  RestaurantMenu
} from '@mui/icons-material';
import { fetchUsers, addDish, deleteDish } from '../store/userSlice';
import Loader from '../components/Loader';
import DishForm from '../components/DishForm';
import MenuTable from '../components/MenuTable';
import ImageCrop from '../components/ImageCrop';

const Home = ({ userRole }) => {
  const dispatch = useDispatch();
  const { dishes, loading, error } = useSelector((state) => state.users);
  const isAdmin = userRole === 'admin';
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAddDish = (newDish) => {
    if (!isAdmin) return;
    
    dispatch(addDish(newDish));
    showSnackbar('Блюдо успешно добавлено!', 'success');
  };

  const handleDeleteDish = (id) => {
    if (!isAdmin) return;
    
    dispatch(deleteDish(id));
    showSnackbar('Блюдо удалено', 'info');
  };

  const handleRefresh = () => {
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
      
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            <RestaurantMenu sx={{ mr: 1, verticalAlign: 'middle' }} />
            {isAdmin ? 'Панель управления меню' : 'Меню шаурмичной'}
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Ошибка загрузки: {error}
          </Alert>
        )}

        <Grid container spacing={3}>
          {isAdmin && (
            <Grid item xs={12} md={4}>
              <DishForm onAddDish={handleAddDish} />
            </Grid>
          )}
          
          <Grid item xs={12} md={isAdmin ? 8 : 12}>
            <MenuTable
              dishes={dishes}
              onDeleteDish={handleDeleteDish}
              isAdmin={isAdmin}
            />
          </Grid>

          {isAdmin && (
            <Grid item xs={12}>
              <ImageCrop />
            </Grid>
          )}
        </Grid>
      </Box>

      <Fab
        color="primary"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={handleRefresh}
        title="Обновить данные"
      >
        <Refresh />
      </Fab>

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