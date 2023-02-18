import {
  createEntityAdapter,
  createSlice
} from '@reduxjs/toolkit';
import { State, Task } from './types';
import { fetchTasks } from './thunks';
import { FetchState } from '../../helpers/fetch-state';
import { UNSELECTED_INDEX } from '../../helpers/etc';

const adapter = createEntityAdapter<Task>({
  selectId: (item) => item.id,
  sortComparer: (a, b) => a.id - b.id,
});

const initialState = (): State => ({
  ...adapter.getInitialState(),
  fetchState: FetchState.INITIAL,
  selectedId: UNSELECTED_INDEX,
});

export const slice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state, action) => {
      state.fetchState = FetchState.PENDING;
    });
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.fetchState = FetchState.ERROR;
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.fetchState = FetchState.SUCCESS;
      adapter.setAll(state, action.payload);
    });
  }
});

export default slice.reducer;

export const tasksSelectors = adapter.getSelectors();