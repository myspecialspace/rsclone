import {
  createEntityAdapter,
  createSlice
} from '@reduxjs/toolkit';
import { State, Board } from './types';
import { fetchBoards } from './thunks';
import { FetchState } from '../../helpers/fetch-state';

const adapter = createEntityAdapter<Board>({
  selectId: (item) => item.id,
  sortComparer: (a, b) => a.id - b.id,
});

const initialState = (): State => ({
  ...adapter.getInitialState(),
  fetchState: FetchState.INITIAL,
});

export const slice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBoards.pending, (state, action) => {
      state.fetchState = FetchState.PENDING;
    });
    builder.addCase(fetchBoards.rejected, (state, action) => {
      state.fetchState = FetchState.ERROR;
    });
    builder.addCase(fetchBoards.fulfilled, (state, action) => {
      state.fetchState = FetchState.SUCCESS;
      adapter.setAll(state, action.payload);
    });
  }
});

export default slice.reducer;