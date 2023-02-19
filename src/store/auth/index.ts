import {
  createSlice
} from '@reduxjs/toolkit';
import { AppState } from '..';
import api from '../../api';
import { LSKey } from '../../helpers/ls';
import { User } from '../../types/user';

export interface AuthState {
  user: User;
  jwt: string;
  userId: number;
  // state:pending/loaded
}

export const getJWTFromStorage = (): string => {
  return localStorage.getItem(LSKey.JWT) || '';
}

export const getUserIdFromStorage = (): string => {
  return localStorage.getItem(LSKey.USER_ID) || '';
};
// what data get from server - user & jwt
const initialState: AuthState = {
  jwt: '',
  userId: null!,
  user: {} as User,
};

// https://redux-toolkit.js.org/tutorials/typescript
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, { payload }) {
      state.jwt = payload.jwt;
      localStorage.setItem(LSKey.JWT, payload.jwt);
      api.setJwt(payload.jwt);

      state.userId = parseInt(payload.userId);
      localStorage.setItem(LSKey.USER_ID, payload.userId);
    },
    setUser(state, { payload }) {
      state.jwt = payload.jwt;
      state.user = payload.user;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
export const authSelectors = {
  userId: (state: AppState) => state.auth.userId,
}