// store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // Aquí irán tus otros reducers
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;