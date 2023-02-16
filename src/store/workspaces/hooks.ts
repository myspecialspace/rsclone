import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, AppState } from "..";
import { FetchState, getFetchStatuses } from "../../helpers/fetch-state";
import { LSKey } from "../../helpers/ls";
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
  };
};

export const getCurrentWorkspaceIdFromStorage = (): number | null => {
  try {
    return JSON.parse(localStorage.getItem(LSKey.CURRENT_WORKSPACE_ID) || 'null');
  } catch (error) {
    return null;
  }
}

export const useCurrentWorkspaceId = () => {
  const workspaces = useWorkspaces();

  const idFromStorage = getCurrentWorkspaceIdFromStorage();

  if (idFromStorage) {
    return idFromStorage;
  } else {
    return workspaces.data[0].id;
  }
};