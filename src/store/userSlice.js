import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; // Redux Toolkit

// Асинхронный экшен с таймаутом (подгрузка данных)
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      // Таймаут 2 секунды для демонстрации подгрузки
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error('Ошибка загрузки данных');
      }
      const data = await response.json();
      
      // Преобразуем в формат блюд
      return data.slice(0, 5).map((user, index) => ({
        id: index + 100,
        name: `Блюдо от ${user.name.split(' ')[0]}`,
        price: `${(index + 1) * 150} ₽`,
        category: index % 3 === 0 ? 'Шаурма' : index % 3 === 1 ? 'Напитки' : 'Закуски'
      }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Создаем слайс Redux
const userSlice = createSlice({
  name: 'users',
  initialState: {
    dishes: [
      { id: 1, name: 'Шаурма классическая', price: '250 ₽', category: 'Шаурма' },
      { id: 2, name: 'Шаурма острая', price: '270 ₽', category: 'Шаурма' },
      { id: 3, name: 'Чизбургер', price: '180 ₽', category: 'Бургеры' },
    ],
    loading: false,
    error: null,
  },
  // Синхронные экшены
  reducers: {
    // Экшен добавления блюда
    addDish: (state, action) => {
      const newDish = {
        id: Date.now(),
        ...action.payload
      };
      state.dishes.push(newDish);
    },
    // Экшен удаления блюда
    deleteDish: (state, action) => {
      state.dishes = state.dishes.filter(dish => dish.id !== action.payload);
    },
    // Экшен очистки меню
    clearDishes: (state) => {
      state.dishes = [];
    },
  },
  // Обработчики для асинхронного экшена
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.dishes = [...state.dishes, ...action.payload];
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Экспортируем синхронные экшены
export const { addDish, deleteDish, clearDishes } = userSlice.actions;
export default userSlice.reducer;