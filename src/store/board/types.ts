import { FetchState } from "../../helpers/fetch-state";
import { Board as _Board } from "../boards/types";

export type Board = _Board;

export interface State {
  fetchState: FetchState;
  id: number;
  board: Board;
}
