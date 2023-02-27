import {
  createEntityAdapter,
  createSlice
} from '@reduxjs/toolkit';
import { State, List } from './types';
import { fetchLists } from './thunks';
import { FetchState } from '../../helpers/fetch-state';
import { UNSELECTED_INDEX } from '../../helpers/etc';

const adapter = createEntityAdapter<List>({
  selectId: (item) => item.id,
  sortComparer: (a, b) => a.id - b.id,
});

const initialState = (): State => ({
  ...adapter.getInitialState(),
  fetchState: FetchState.INITIAL,
  editState: FetchState.INITIAL,
  selectedId: UNSELECTED_INDEX,
  boardId: UNSELECTED_INDEX,
});

export const slice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    setBoardId(state, { payload }) {
      state.boardId = payload;
      state.fetchState = FetchState.INITIAL;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLists.pending, (state, action) => {
      state.fetchState = FetchState.PENDING;
    });
    builder.addCase(fetchLists.rejected, (state, action) => {
      state.fetchState = FetchState.ERROR;
    });
    builder.addCase(fetchLists.fulfilled, (state, action) => {
      state.fetchState = FetchState.SUCCESS;
      adapter.setAll(state, action.payload);
    });
  }
});

export default slice.reducer;
export const listsActions = slice.actions;
export const listsSelectors = adapter.getSelectors();