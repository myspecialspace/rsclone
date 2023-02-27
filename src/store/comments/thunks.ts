import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";
import { getMappedResponse } from "../../helpers/strapi";
import * as strapi from "../../helpers/strapi-types";
import { Comment } from "./types";

export const fetchComments = createAsyncThunk<Comment[], number>(
  "comments/fetch",
  async (boardId, { rejectWithValue }) => {
    try {
      const response = await api.getInstance().get<strapi.CollectionResponse<Comment>>(`comments?filters[task][list][board][id]=${boardId}&populate=task`);
      const data = getMappedResponse(response.data);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

interface CreateData {
  task: number;
  content: string;
  owner: number;
}

export const fetchCreate = createAsyncThunk<Comment, CreateData>(
    'comments/create',
    async (data, { rejectWithValue }) => {
      try {
        const response = await api
          .getInstance()
          .post<strapi.SingleResponse<Comment>>('comments', { data });
        return getMappedResponse(response.data);
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );