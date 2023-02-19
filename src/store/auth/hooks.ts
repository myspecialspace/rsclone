import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, AppState } from "..";
import { isIdSelected } from "../../helpers/etc";
import { FetchState, getFetchStatuses } from "../../helpers/fetch-state";
import { fetchUser } from "./thunks";

export const useUser = () => {
  const dispatch = useAppDispatch();
  const userId = useSelector((state: AppState) => state.auth.userId);
  const fetchState = useSelector((state: AppState) => state.auth.fetchState);
  const data = useSelector((state: AppState) => state.auth.user);

  useEffect(() => {
    if (fetchState === FetchState.INITIAL && isIdSelected(userId)) {
      dispatch(fetchUser(userId));
    }
  }, [fetchState, userId, dispatch]);

  return {
    ...getFetchStatuses(fetchState),
    data,
    refetch: () => dispatch(fetchUser(userId)),
  };
};
