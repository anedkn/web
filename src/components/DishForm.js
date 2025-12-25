import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  MenuItem,
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Alert
} from '@mui/material'; // MUI компоненты
import { AddCircle, ErrorOutline } from '@mui/icons-material';

// Компонент формы с пропсом onAddDish для добавления блюда
const DishForm = ({ onAddDish }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Шаурма');
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  // Валидация при изменении полей
  useEffect(() => {
    const newErrors = {};
    
    if (name && name.length < 2) {
      newErrors.name = 'Название должно быть не менее 2 символов';
    }
    
    if (price && (isNaN(price) || Number(price) <= 0)) {
      newErrors.price = 'Цена должна быть числом больше 0';
    }
    
    setErrors(newErrors);
  }, [name, price]);

  // Функция валидации формы
  const validateForm = () => {
    const newErrors = {};
    
    if (!name.trim()) {
      newErrors.name = 'Введите название блюда';
    } else if (name.length < 2) {
      newErrors.name = 'Название должно быть не менее 2 символов';
    }
    
    if (!price) {
      newErrors.price = 'Введите цену';
    } else if (isNaN(price)) {
      newErrors.price = 'Цена должна быть числом';
    } else if (Number(price) <= 0) {
      newErrors.price = 'Цена должна быть больше 0';
    } else if (Number(price) > 10000) {
      newErrors.price = 'Цена не может быть больше 10000 ₽';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitError('');
    
    // Валидация перед отправкой
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitError('Исправьте ошибки в форме');
      return;
    }

    const newDish = {
      name: name.trim(),
      price: `${price} ₽`,
      category
    };

    // Вызываем переданный пропс onAddDish
    onAddDish(newDish);
    
    // Очищаем форму
    setName('');
    setPrice('');
    setCategory('Шаурма');
    setErrors({});
    setSubmitError('');
  };

  const categories = [
    'Шаурма',
    'Бургеры',
    'Напитки',
    'Закуски',
    'Салаты',
    'Десерты',
    'Гарниры'
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Добавить новое блюдо
        </Typography>
        
        {submitError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {submitError}
          </Alert>
        )}
        
        <Box component="form" onSubmit={handleSubmit}>
          {/* MUI TextField с валидацией */}
          <TextField
            fullWidth
            label="Название блюда"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            required
            placeholder="Например: Шаурма с курицей"
            error={!!errors.name}
            helperText={errors.name}
            inputProps={{ maxLength: 50 }}
          />
          
          <TextField
            fullWidth
            label="Категория"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            margin="normal"
            select
            required
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>
          
          <TextField
            fullWidth
            label="Цена (рубли)"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            margin="normal"
            required
            inputProps={{ 
              min: 1, 
              max: 10000,
              step: 1
            }}
            placeholder="250"
            error={!!errors.price}
            helperText={errors.price}
          />
        </Box>
      </CardContent>
      
      <CardActions>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<AddCircle />}
          onClick={handleSubmit}
          fullWidth
          size="large"
          disabled={Object.keys(errors).length > 0}
        >
          Добавить блюдо
        </Button>
      </CardActions>
      
      <Box sx={{ p: 2, pt: 0 }}>
        <Typography variant="caption" color="text.secondary">
          <ErrorOutline sx={{ fontSize: 14, verticalAlign: 'middle', mr: 0.5 }} />
          Простая валидация: название (2-50 символов), цена (1-10000 ₽)
        </Typography>
      </Box>
    </Card>
  );
};

export default DishForm;