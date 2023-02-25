import { FetchState } from '../../helpers/fetch-state';
import { Board as BaseBoard } from '../../types/board';
import { List as BaseList } from '../../types/list';
import { Task as BaseTask } from '../../types/task';

export interface List extends BaseList {
  tasks: BaseTask[];
}
export interface Board extends BaseBoard {
  lists: List[];
}

export interface State {
  fetchState: FetchState;
  id: number;
  board: Board;
}

export interface DeleteBoard {
  boardId: number;
}

export interface UpdateData {
  boardId: number;
  name: string;
  //   description: string;
  isFavorite: boolean;
  isPrivate: boolean;
  //   isClosed: boolean;
}
