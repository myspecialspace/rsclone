import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';

import authReducer, { AuthState } from './auth';
import workspacesReducer from './workspaces';
import workspaceReducer from './workspace';
import boardsReducer from './boards';
import boardReducer from './board';
import listsReducer from './lists';
import tasksReducer from './tasks';

import { State as WorkspacesState } from './workspaces/types';
import { State as WorkspaceState } from './workspace/types';
import { State as BoardsState } from './boards/types';
import { State as BoardState } from './board/types';
import { State as ListsState } from './lists/types';
import { State as TasksState } from './tasks/types';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    workspaces: workspacesReducer,
    workspace: workspaceReducer,
    boards: boardsReducer,
    board: boardReducer,
    lists: listsReducer,
    tasks: tasksReducer,
  },
});

export interface AppState {
  auth: AuthState;
  workspaces: WorkspacesState;
  workspace: WorkspaceState;
  boards: BoardsState;
  board: BoardState;
  lists: ListsState;
  tasks: TasksState;
}

export default store;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
