import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, AppState } from "..";
import { isIdSelected } from "../../helpers/etc";
import { FetchState, getFetchStatuses } from "../../helpers/fetch-state";
import { fetchComments } from "./thunks";

export const useTasks = (boardId: number) => {
  const dispatch = useAppDispatch();
  const fetchState = useSelector((state: AppState) => state.tasks.fetchState);
  const dataDict = useSelector((state: AppState) => state.tasks.entities);
  const data = useSelector((state: AppState) => {
    return state.tasks.ids.map((id) => dataDict[id]!);
  });

  useEffect(() => {
    if (fetchState === FetchState.INITIAL && isIdSelected(boardId)) {
      dispatch(fetchComments(boardId));
    }
  }, [fetchState, boardId, dispatch]);

  return {
    ...getFetchStatuses(fetchState),
    data,
    dataDict,
    refetch: () => dispatch(fetchComments(boardId)),
  };
};
