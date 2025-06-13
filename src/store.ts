// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import walletsReducer from "@/features/wallets/walletsSlice";
import userReducer from "@/features/user/userSlice";
export const store = configureStore({
  reducer: {
    wallets: walletsReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
