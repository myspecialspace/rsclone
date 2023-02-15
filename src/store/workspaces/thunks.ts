import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "..";
import { API_BASE } from "../../helpers/api";
import { FetchState, getFetchStatuses } from "../../helpers/fetch-state";
import { getMappedResponse } from "../../helpers/strapi";
import * as strapi from "../../helpers/strapi-types";
import { Workspace } from './types';


export const fetchWorkspaces = createAsyncThunk<Workspace[], number>(
  "workspaces/fetch",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get<strapi.CollectionResponse<Workspace>>(`${API_BASE}/api/workspaces?populate=owner&filters[owner][id][$eq]=${userId}`);
      const data = getMappedResponse(response.data);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const useWorkspaces = () => {
  const dispatch = useAppDispatch();
  const fetchState = useSelector((state: AppState) => state.workspaces.fetchState);
  const userId = useSelector((state: AppState) => state.auth.user?.id);
  const dataDict = useSelector((state: AppState) => state.workspaces.entities);
  const data = useSelector((state: AppState) => {
    return state.workspaces.ids.map((id) => dataDict[id]!);
  })

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