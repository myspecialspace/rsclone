import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";
import { getMappedResponse } from "../../helpers/strapi";
import * as strapi from "../../helpers/strapi-types";
import { Board } from './types';

export const fetchBoard = createAsyncThunk<Board, number>(
  "board/fetch",
  async (boardId, { rejectWithValue }) => {
    try {
      const response = await api.getInstance().get<strapi.SingleResponse<Board>>(`boards/${boardId}?populate=workspace.members,lists.tasks`);
      const data = getMappedResponse(response.data);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
