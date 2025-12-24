import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material'; // MUI компоненты
import { Delete } from '@mui/icons-material';

// Компонент таблицы с пропсами: dishes, onDeleteDish, isAdmin
const MenuTable = ({ dishes, onDeleteDish, isAdmin }) => {
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    dishId: null,
    dishName: ''
  });

  const handleDeleteClick = (id, name) => {
    // Открываем модальное окно подтверждения
    setDeleteDialog({
      open: true,
      dishId: id,
      dishName: name
    });
  };

  const handleDeleteConfirm = () => {
    if (deleteDialog.dishId) {
      // Вызываем пропс onDeleteDish для удаления
      onDeleteDish(deleteDialog.dishId);
    }
    setDeleteDialog({ open: false, dishId: null, dishName: '' });
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, dishId: null, dishName: '' });
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Шаурма': 'primary',
      'Бургеры': 'secondary',
      'Напитки': 'success',
      'Закуски': 'warning',
      'Салаты': 'info',
      'Десерты': 'error',
      'Гарниры': 'default'
    };
    return colors[category] || 'default';
  };

  return (
    <>
      {/* MUI Table для отображения меню */}
      <TableContainer component={Paper}>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">
            Меню шаурмичной
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Всего блюд: {dishes.length}
          </Typography>
        </Box>
        
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Название</strong></TableCell>
              <TableCell><strong>Категория</strong></TableCell>
              <TableCell><strong>Цена</strong></TableCell>
              {isAdmin && <TableCell align="center"><strong>Действия</strong></TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {dishes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={isAdmin ? 4 : 3} align="center">
                  <Typography color="textSecondary" py={3}>
                    Меню пока пустое. Добавьте первое блюдо!
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              dishes.map((dish) => (
                <TableRow key={dish.id} hover>
                  <TableCell>{dish.name}</TableCell>
                  <TableCell>
                    <Chip 
                      label={dish.category} 
                      color={getCategoryColor(dish.category)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" color="primary">
                      {dish.price}
                    </Typography>
                  </TableCell>
                  {isAdmin && (
                    <TableCell align="center">
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteClick(dish.id, dish.name)}
                        title="Удалить"
                        aria-label={`Удалить ${dish.name}`}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Модальное окно подтверждения удаления (MUI Dialog) */}
      <Dialog
        open={deleteDialog.open}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ color: 'error.main' }}>
          ⚠️ Подтверждение удаления
        </DialogTitle>
        
        <DialogContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Delete color="error" sx={{ mr: 2, fontSize: 40 }} />
            <DialogContentText id="alert-dialog-description" sx={{ fontSize: '1.1rem' }}>
              Вы уверены, что хотите удалить блюдо
              <Typography component="span" sx={{ fontWeight: 'bold', color: 'error.main', ml: 1 }}>
                "{deleteDialog.dishName}"?
              </Typography>
            </DialogContentText>
          </Box>
          
          <Box sx={{ 
            p: 2, 
            bgcolor: 'rgba(244, 67, 54, 0.1)', 
            borderRadius: 1,
            border: '1px solid rgba(244, 67, 54, 0.3)'
          }}>
            <Typography variant="body2" color="text.secondary">
              ❗ Это действие нельзя отменить. Блюдо будет полностью удалено из меню.
            </Typography>
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={handleDeleteCancel} 
            variant="outlined"
            sx={{ mr: 1 }}
          >
            Отмена
          </Button>
          <Button 
            onClick={handleDeleteConfirm} 
            variant="contained" 
            color="error"
            autoFocus
            startIcon={<Delete />}
          >
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MenuTable;