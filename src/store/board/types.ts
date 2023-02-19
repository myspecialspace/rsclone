import { FetchState } from "../../helpers/fetch-state";
import { Board as BaseBoard } from "../../types/board";

export interface Board extends BaseBoard { }

export interface State {
  fetchState: FetchState;
  id: number;
  board: Board;
}
