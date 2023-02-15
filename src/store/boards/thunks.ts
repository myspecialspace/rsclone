import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "..";
import { API_BASE } from "../../helpers/api";
import { FetchState, getFetchStatuses } from "../../helpers/fetch-state";
import { getMappedResponse } from "../../helpers/strapi";
import * as strapi from "../../helpers/strapi-types";
import { Board } from './types';

export const fetchBoards = createAsyncThunk<Board[], number>(
  "boards/fetch",
  async (workspaceId, { rejectWithValue }) => {
    try {
      const response = await axios.get<strapi.CollectionResponse<Board>>(`${API_BASE}/api/boards?populate=owner&filters[workspace][id][$eq]=${workspaceId}`);
      const data = getMappedResponse(response.data);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const useBoards = () => {
  const dispatch = useAppDispatch();
  const fetchState = useSelector((state: AppState) => state.workspaces.fetchState);
  const workspaceId = useSelector((state: AppState) => state.workspaces.selectedId);
  const dataDict = useSelector((state: AppState) => state.workspaces.entities);
  const data = useSelector((state: AppState) => {
    return state.workspaces.ids.map((id) => dataDict[id]!);
  })

  useEffect(() => {
    if (fetchState === FetchState.INITIAL && workspaceId) {
      dispatch(fetchBoards(workspaceId));
    }
  }, [fetchState, workspaceId, dispatch]);

  return {
    ...getFetchStatuses(fetchState),
    data,
    dataDict,
  };
};