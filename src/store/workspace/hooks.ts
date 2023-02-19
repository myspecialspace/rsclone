import { useEffect } from "react";
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "..";
import { UNSELECTED_INDEX } from "../../helpers/etc";
import { FetchState, getFetchStatuses } from "../../helpers/fetch-state";
import { LSKey } from "../../helpers/ls";
import { workspacesSelectors } from "../workspaces";
import { useWorkspaces } from "../workspaces/hooks";
import { fetchWorkspace } from "./thunks";

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
    return workspaces.data[0]?.id;
  }
};

export const useCurrentWorkspace = () => {
  const workspaceId = useCurrentWorkspaceId();
  const workspace = useSelector((state: AppState) =>
    workspacesSelectors.selectById(state.workspaces, workspaceId));

  return workspace;
};

export const useWorkspace = () => {
  const dispatch = useAppDispatch();
  const fetchState = useSelector((state: AppState) => state.workspace.fetchState);
  const workspaceId = useSelector((state: AppState) => state.workspace.id);
  const data = useSelector((state: AppState) => state.workspace.workspace);

  useEffect(() => {
    if (fetchState === FetchState.INITIAL && workspaceId !== UNSELECTED_INDEX) {
      dispatch(fetchWorkspace(workspaceId));
    }
  }, [fetchState, dispatch, workspaceId]);

  return {
    ...getFetchStatuses(fetchState),
    data,
    refetch: () => dispatch(fetchWorkspace(workspaceId)),
  };
};
