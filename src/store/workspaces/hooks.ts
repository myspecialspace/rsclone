import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, AppState } from "..";
import { FetchState, getFetchStatuses } from "../../helpers/fetch-state";
import { fetchWorkspaces } from "./thunks";

export const useWorkspaces = () => {
  const dispatch = useAppDispatch();
  const fetchState = useSelector((state: AppState) => state.workspaces.fetchState);
  const userId = useSelector((state: AppState) => state.auth.userId);
  const dataDict = useSelector((state: AppState) => state.workspaces.entities);
  const data = useSelector((state: AppState) => {
    return state.workspaces.ids.map((id) => dataDict[id]!);
  });

  useEffect(() => {
    if (fetchState === FetchState.INITIAL && userId) {
      dispatch(fetchWorkspaces(userId));
    }
  }, [fetchState, userId, dispatch]);

  return {
    ...getFetchStatuses(fetchState),
    data,
    dataDict,
    refetch: () => dispatch(fetchWorkspaces(userId)),
  };
};
