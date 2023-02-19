import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";
import { getMappedResponse } from "../../helpers/strapi";
import { Task } from './types';
import * as strapi from "../../helpers/strapi-types";

export const fetchTasks = createAsyncThunk<Task[], number>(
  "tasks/fetch",
  async (boardId, { rejectWithValue }) => {
    try {
      const response = await api.getInstance().get<strapi.CollectionResponse<Task>>(`tasks?filters[list][board][id]=${boardId}&populate=list`);
      const data = getMappedResponse(response.data);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

interface CreateData {
  name: string;
  description: string;
  order: number;
  board: number;
  list: number;
  owner: number;
}

export const fetchCreate = createAsyncThunk<Task, CreateData>(
  "tasks/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.getInstance().post<strapi.SingleResponse<Task>>('tasks', { data });
      return getMappedResponse(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


