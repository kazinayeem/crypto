// features/user/userSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface User {
  user_id: string;
  email: string;
  full_name: string;
  nickname: string;
  photo_url: string;
  created_at: string;
  last_login_at: string;
  updated_at: string;
  is_active: boolean;
}

interface ExchangeCredential {
  id: string;
  user_id: string;
  cex_name: string;
  credentials: {
    api_key: string;
    api_secret: string;
  };
  created_at: string;
  updated_at: string;
}

interface AvailableCEX {
  name: string;
  label: string;
  supported: boolean;
}

interface UserState {
  users: User[];
  userExchangeCredentials: ExchangeCredential[];
  availableCEX: AvailableCEX[];
}

const initialState: UserState = {
  users: [],
  userExchangeCredentials: [],
  availableCEX: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    addUser(state, action: PayloadAction<User>) {
      state.users.push(action.payload);
    },
    setUserExchangeCredentials(
      state,
      action: PayloadAction<ExchangeCredential[]>
    ) {
      state.userExchangeCredentials = action.payload;
    },
    addUserExchangeCredential(
      state,
      action: PayloadAction<ExchangeCredential>
    ) {
      state.userExchangeCredentials.push(action.payload);
    },
    setAvailableCEX(state, action: PayloadAction<AvailableCEX[]>) {
      state.availableCEX = action.payload;
    },
    updateUser(state, action: PayloadAction<User>) {
      const index = state.users.findIndex(
        (u) => u.user_id === action.payload.user_id
      );
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    removeUser(state, action: PayloadAction<string>) {
      state.users = state.users.filter((u) => u.user_id !== action.payload);
    },
  },
});

export const {
  setUsers,
  addUser,
  setUserExchangeCredentials,
  addUserExchangeCredential,
  setAvailableCEX,
  updateUser,
  removeUser,
} = userSlice.actions;

export default userSlice.reducer;
