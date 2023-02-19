import {
  createSlice
} from '@reduxjs/toolkit';
import { State } from './types';
import { FetchState } from '../../helpers/fetch-state';
import { fetchWorkspace } from './thunks';
import { LSKey } from '../../helpers/ls';
import { UNSELECTED_INDEX } from '../../helpers/etc';

const initialState = (): State => ({
  fetchState: FetchState.INITIAL,
  workspace: null!,
  id: UNSELECTED_INDEX,
});

export const slice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    setId(state, { payload }) {
      if (state.id !== payload) {
        state.id = payload;
        localStorage.setItem(LSKey.CURRENT_WORKSPACE_ID, payload);
        state.fetchState = FetchState.INITIAL;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWorkspace.pending, (state, action) => {
      state.fetchState = FetchState.PENDING;
    });
    builder.addCase(fetchWorkspace.rejected, (state, action) => {
      state.fetchState = FetchState.ERROR;
    });
    builder.addCase(fetchWorkspace.fulfilled, (state, action) => {
      state.workspace = action.payload;
      state.fetchState = FetchState.SUCCESS;
    });
  }
});

export default slice.reducer;
export const workspaceActions = slice.actions;