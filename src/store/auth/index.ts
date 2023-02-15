import {
  createSlice
} from '@reduxjs/toolkit';
import axios from 'axios';

export interface AuthState {
  user: User;
  jwt: string;
  // state:pending/loaded
}

enum Theme {
  SYSTEM = 'system',
  LIGHT = 'light',
  DARK = 'dark',
}

interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  backgroundColor?: string;
  theme: Theme;
}
// what data get from server - user & jwt
const initialState: AuthState = {
  jwt: '',
  user: {} as User,
};
// https://redux-toolkit.js.org/tutorials/typescript
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, { payload }) {
      state.jwt = payload.jwt;
      state.user = payload.user;

      axios.defaults.headers.common['Authorization'] = `Bearer ${payload.jwt}`;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;