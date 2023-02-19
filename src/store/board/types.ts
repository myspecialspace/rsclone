import { FetchState } from "../../helpers/fetch-state";
import { Board as BaseBoard } from "../../types/board";
import { List as BaseList } from '../../types/list';
import { Task as BaseTask } from '../../types/task';


interface List extends BaseList {
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
