import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/slices/authSlice';
import blogReducer from '../store/slices/blogSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    blog: blogReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;