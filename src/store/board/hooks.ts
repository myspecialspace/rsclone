import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, AppState } from "..";
import { isIdSelected } from "../../helpers/etc";
import { FetchState, getFetchStatuses } from "../../helpers/fetch-state";
import { fetchBoard } from "./thunks";

export const useBoard = () => {
  const dispatch = useAppDispatch();
  const boardId = useSelector((state: AppState) => state.board.id);
  const fetchState = useSelector((state: AppState) => state.board.fetchState);
  const data = useSelector((state: AppState) => state.board.board);

  useEffect(() => {
    if (fetchState === FetchState.INITIAL && isIdSelected(boardId)) {
      dispatch(fetchBoard(boardId));
    }
  }, [fetchState, boardId, dispatch]);

  return {
    ...getFetchStatuses(fetchState),
    data,
    refetch: () => dispatch(fetchBoard(boardId)),
  };
};
