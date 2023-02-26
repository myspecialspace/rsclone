import {
    createEntityAdapter,
    createSlice
  } from '@reduxjs/toolkit';
  import { State, Comment } from './types';
  import { fetchComments } from './thunks';
  import { FetchState } from '../../helpers/fetch-state';
  import { UNSELECTED_INDEX } from '../../helpers/etc';
  
  const adapter = createEntityAdapter<Comment>({
    selectId: (item) => item.id,
    sortComparer: (a, b) => a.id - b.id,
  });
  
  const initialState = (): State => ({
    ...adapter.getInitialState(),
    fetchState: FetchState.INITIAL,
    selectedId: UNSELECTED_INDEX,
  });
  
  export const slice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchComments.pending, (state, action) => {
        state.fetchState = FetchState.PENDING;
      });
      builder.addCase(fetchComments.rejected, (state, action) => {
        state.fetchState = FetchState.ERROR;
      });
      builder.addCase(fetchComments.fulfilled, (state, action) => {
        state.fetchState = FetchState.SUCCESS;
        adapter.setAll(state, action.payload);
      });
    }
  });
  
  export default slice.reducer;
  
  export const tasksSelectors = adapter.getSelectors();