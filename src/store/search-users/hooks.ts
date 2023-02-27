import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "..";
import { getFetchStatuses } from "../../helpers/fetch-state";
import { searchUsers } from "./thunks";
import * as selectors from './selectors'

export const useSearchUsers = () => {
  const dispatch = useAppDispatch();
  const fetchState = useSelector(selectors.fetchState);
  const search = useSelector(selectors.search);
  const data = useSelector(selectors.users);

  useEffect(() => {
      dispatch(searchUsers({ search }));
  }, [search]);

  return {
    ...getFetchStatuses(fetchState),
    data,
    refetch: () => dispatch(searchUsers({ search })),
  };
};