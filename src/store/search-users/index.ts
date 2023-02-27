import {
  createSlice,
} from '@reduxjs/toolkit';
import { State } from './types';
import { FetchState } from '../../helpers/fetch-state';
import { searchUsers } from './thunks';
import * as selectors from './selectors';

const initialState = (): State => ({
  fetchState: FetchState.INITIAL,
  users: [],
  search: '',
});

export const slice = createSlice({
  name: 'searchUsers',
  initialState,
  reducers: {
    setSearch(state, { payload }) {
      state.search = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchUsers.pending, (state, action) => {
      state.fetchState = FetchState.PENDING;
    });
    builder.addCase(searchUsers.rejected, (state, action) => {
      state.fetchState = FetchState.ERROR;
    });
    builder.addCase(searchUsers.fulfilled, (state, { payload }) => {
      state.fetchState = FetchState.SUCCESS;
      state.users = payload;
    });
  }
});

export default slice.reducer;
export const searchUsesrActions = slice.actions;
export const searchUsersSelectors = selectors;
