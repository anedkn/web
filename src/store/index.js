import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

// Создаем Redux store
export const store = configureStore({
  reducer: {
    users: userReducer, // Подключаем редьюсер пользователей
  },
});