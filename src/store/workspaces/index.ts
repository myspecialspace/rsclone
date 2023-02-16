import {
  createEntityAdapter,
  createSlice
} from '@reduxjs/toolkit';
import { State, Workspace } from './types';
import { fetchWorkspaces } from './thunks';
import { FetchState } from '../../helpers/fetch-state';


const workspacesAdapter = createEntityAdapter<Workspace>({
  selectId: (item) => item.id,
  sortComparer: (a, b) => a.id - b.id,
});

const initialState = (): State => ({
  ...workspacesAdapter.getInitialState(),
  fetchState: FetchState.INITIAL,
  selectedId: -1,
});

export const workspacesSlice = createSlice({
  name: 'workspaces',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWorkspaces.pending, (state, action) => {
      state.fetchState = FetchState.PENDING;
    });
    builder.addCase(fetchWorkspaces.rejected, (state, action) => {
      state.fetchState = FetchState.ERROR;
    });
    builder.addCase(fetchWorkspaces.fulfilled, (state, action) => {
      state.fetchState = FetchState.SUCCESS;
      workspacesAdapter.setAll(state, action.payload);
    });
  }
});

export default workspacesSlice.reducer;

