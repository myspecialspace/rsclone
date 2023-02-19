import {
  createSlice
} from '@reduxjs/toolkit';
import api from '../../api';
import { FetchState } from '../../helpers/fetch-state';
import { LSKey } from '../../helpers/ls';
import { fetchUser } from './thunks';
import { State } from './types';


export const getJWTFromStorage = (): string => {
  return localStorage.getItem(LSKey.JWT) || '';
}

export const getUserIdFromStorage = (): string => {
  return localStorage.getItem(LSKey.USER_ID) || '';
};
// what data get from server - user & jwt
const initialState: State = {
  jwt: '',
  userId: null!,
  user: null!,
  fetchState: FetchState.INITIAL,
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
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state, action) => {
      state.fetchState = FetchState.PENDING;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.fetchState = FetchState.ERROR;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.fetchState = FetchState.SUCCESS;
      state.user = action.payload;
    });
  }
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
