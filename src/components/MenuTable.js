import React from 'react';
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
  Box
} from '@mui/material';
import { Delete } from '@mui/icons-material';

const MenuTable = ({ dishes, onDeleteDish, isAdmin }) => {
  const handleDelete = (id, name) => {
    if (window.confirm(`Удалить блюдо "${name}"?`)) {
      onDeleteDish(id);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Шаурма': 'primary',
      'Бургеры': 'secondary',
      'Напитки': 'success',
      'Салаты': 'info'
    };
    return colors[category] || 'default';
  };

  return (
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
                      onClick={() => handleDelete(dish.id, dish.name)}
                      title="Удалить"
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
  );
};

export default MenuTable;