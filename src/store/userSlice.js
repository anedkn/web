import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error('Ошибка загрузки данных');
      }
      const data = await response.json();
      
      return data.slice(0, 5).map((user, index) => ({
        id: index + 1,
        name: `Блюдо от ${user.name.split(' ')[0]}`,
        price: `${(index + 1) * 5}.00 Br`,
        category: index % 3 === 0 ? 'Шаурма' : index % 3 === 1 ? 'Напитки' : 'Закуски'
      }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState: {
    dishes: [
      { id: 1, name: 'Шаурма классическая', price: '12.50 Br', category: 'Шаурма' },
      { id: 2, name: 'Шаурма острая', price: '13.00 Br', category: 'Шаурма' },
      { id: 3, name: 'Чизбургер', price: '9.00 Br', category: 'Бургеры' },
      { id: 4, name: 'Кола', price: '4.00 Br', category: 'Напитки' },
      { id: 5, name: 'Овощной салат', price: '8.50 Br', category: 'Салаты' },
    ],
    loading: false,
    error: null,
  },
  reducers: {
    addDish: (state, action) => {
      const newDish = {
        id: state.dishes.length + 1,
        ...action.payload
      };
      state.dishes.push(newDish);
    },
    deleteDish: (state, action) => {
      state.dishes = state.dishes.filter(dish => dish.id !== action.payload);
    },
    clearDishes: (state) => {
      state.dishes = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        if (state.dishes.length < 5) {
          state.dishes = [...state.dishes, ...action.payload];
        }
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addDish, deleteDish, clearDishes } = userSlice.actions;
export default userSlice.reducer;