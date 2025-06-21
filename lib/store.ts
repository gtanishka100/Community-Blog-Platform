import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/slices/authSlice';
import blogReducer from '../store/slices/blogSlice';
import postsReducer from '../store/slices/postsSlice';
import connectionReducer from '../store/slices/connectionSlice';
import tagsReducer from '../store/slices/tagsSlice'; // Add this import

export const store = configureStore({
  reducer: {
    auth: authReducer,
    blog: blogReducer,
    posts: postsReducer,
    connections: connectionReducer,
    tags: tagsReducer, // Add this line
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