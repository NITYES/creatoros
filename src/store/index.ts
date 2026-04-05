// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import applicationReducer from './applicationSlice'
import { creatorApi } from './userApiService';

export const store = configureStore({
  reducer: {
    user: userReducer,
    application: applicationReducer,
    [creatorApi.reducerPath]: creatorApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(creatorApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;