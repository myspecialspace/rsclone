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

export const fetchBoard = createAsyncThunk<Board, number>(
  "board/fetch",
  async (boardId, { rejectWithValue }) => {
    try {
      const response = await axios.get<strapi.SingleResponse<Board>>(`${API_BASE}/boards/${boardId}?populate=workspace`);
      const data = getMappedResponse(response.data);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const useBoard = (boardId: number) => {
  const dispatch = useAppDispatch();
  const fetchState = useSelector((state: AppState) => state.boards.fetchState);
  const data = useSelector((state: AppState) => state.board.board);

  useEffect(() => {
    if (fetchState === FetchState.INITIAL && boardId) {
      dispatch(fetchBoard(boardId));
    }
  }, [fetchState, boardId, dispatch]);

  return {
    ...getFetchStatuses(fetchState),
    data,
  };
};
