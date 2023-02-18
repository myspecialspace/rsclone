import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, AppState } from "..";
import { isIdSelected } from "../../helpers/etc";
import { FetchState, getFetchStatuses } from "../../helpers/fetch-state";
import { fetchLists } from "./thunks";

export const useLists = () => {
  const dispatch = useAppDispatch();
  const boardId = useSelector((state: AppState) => state.lists.boardId);
  const fetchState = useSelector((state: AppState) => state.lists.fetchState);
  const dataDict = useSelector((state: AppState) => state.lists.entities);
  const data = useSelector((state: AppState) => {
    return state.lists.ids.map((id) => dataDict[id]!);
  });

  useEffect(() => {
    if (fetchState === FetchState.INITIAL && isIdSelected(boardId)) {
      dispatch(fetchLists(boardId));
    }
  }, [fetchState, boardId, dispatch]);

  return {
    ...getFetchStatuses(fetchState),
    data,
    dataDict,
    refetch: () => dispatch(fetchLists(boardId)),
  };
};
