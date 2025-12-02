import React, { useState } from 'react';
import {
  TextField,
  Button,
  MenuItem,
  Card,
  CardContent,
  CardActions,
  Typography,
  Box
} from '@mui/material';
import { AddCircle } from '@mui/icons-material';

const DishForm = ({ onAddDish }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Шаурма');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name.trim() || !price || Number(price) <= 0) {
      alert('Заполните все поля корректно!');
      return;
    }

    const newDish = {
      name: name.trim(),
      price: `${price} Br`,
      category
    };

    onAddDish(newDish);
    
    setName('');
    setPrice('');
    setCategory('Шаурма');
  };

  const categories = [
    'Шаурма',
    'Бургеры',
    'Напитки',
    'Салаты'
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Добавить новое блюдо
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Название блюда"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            required
            placeholder="Например: Шаурма с курицей"
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
            label="Цена (белорусские рубли)"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            margin="normal"
            required
            inputProps={{ min: 1 }}
            placeholder="12.50"
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
        >
          Добавить блюдо
        </Button>
      </CardActions>
    </Card>
  );
};

export default DishForm;