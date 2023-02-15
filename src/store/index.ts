import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';

import authReducer, { AuthState } from './auth';
import workspacesReducer from './workspaces';
import boardsReducer from './boards';
import boardReducer from './board';

import { State as WorkspacesState } from './workspaces/types';
import { State as BoardsState } from './boards/types';
import { State as BoardState } from './board/types';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    workspaces: workspacesReducer,
    boards: boardsReducer,
    board: boardReducer,
  },
});

export interface AppState {
  auth: AuthState;
  workspaces: WorkspacesState;
  boards: BoardsState;
  board: BoardState;
}

export default store;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
