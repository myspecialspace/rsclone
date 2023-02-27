import {
  createSlice,
} from '@reduxjs/toolkit';
import { State, List } from './types';
import { editListOrder, editTaskOrder, fetchBoard } from './thunks';
import { FetchState } from '../../helpers/fetch-state';
import { Task } from '../../types/task';

const initialState = (): State => ({
  fetchState: FetchState.INITIAL,
  board: null!,
  id: -1,
});

const sortListAndTasks = (lists: List[]): List[] => {
  return lists
    .map((list) => {
      return {
        ...list,
        tasks: list.tasks.sort((a, b) => a.order - b.order)
      };
    })
    .sort((a, b) => a.order - b.order);
};

const findTaskById = (board: State['board'], taskId: number): Task | undefined => {
  for (const list of board.lists || []) {

    for (const task of list.tasks || []) {
      if (task.id === taskId) {
        return task;
      }
    }
  }
};

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
    builder.addCase(fetchBoard.fulfilled, (state, { payload }) => {
      state.fetchState = FetchState.SUCCESS;
      state.board = payload;

      const lists = sortListAndTasks(payload.lists);

      state.board.lists = lists;
    });

    builder.addCase(editListOrder.pending, (state, action) => {
      /**
       * обновляем ордер в стейте, чтобы не было визуального лага,
       * пока запрос на обновление ордера грузится
       * */
      const listId = action.meta.arg.listId;
      const reorderList = state.board.lists.find((list) => list.id === listId)!;
      reorderList.order = action.meta.arg.patch.order;

      state.board.lists = sortListAndTasks(state.board.lists);
    });

    builder.addCase(editTaskOrder.pending, (state, action) => {
      /**
       * обновляем ордер в стейте, чтобы не было визуального лага,
       * пока запрос на обновление ордера грузится
       * */
      const { taskId, patch } = action.meta.arg;
      const task = findTaskById(state.board, taskId)!;
      task.order = patch.order;

      state.board.lists = sortListAndTasks(state.board.lists);
    });
  }
});

export default slice.reducer;
export const boardActions = slice.actions;