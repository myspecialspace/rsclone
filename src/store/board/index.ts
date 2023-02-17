import {
  createSlice
} from '@reduxjs/toolkit';
import { State, Board } from './types';
import { FetchState } from '../../helpers/fetch-state';
import { fetchBoard } from './thunks';

const initialState = (): State => ({
  fetchState: FetchState.INITIAL,
  board: {} as Board,
  id: -1,
});

export const slice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setId(state, { payload }) {
      state.id = payload;
      state.fetchState = FetchState.INITIAL;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBoard.pending, (state, action) => {
      state.fetchState = FetchState.PENDING;
    });
    builder.addCase(fetchBoard.rejected, (state, action) => {
      state.fetchState = FetchState.ERROR;
    });
    builder.addCase(fetchBoard.fulfilled, (state, action) => {
      state.fetchState = FetchState.SUCCESS;
      state.board = action.payload;
    });
  }
});

export default slice.reducer;
export const boardActions = slice.actions;