import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";
import { getMappedResponse } from "../../helpers/strapi";
import { Workspace } from './types';
import * as strapi from "../../helpers/strapi-types";


export const fetchWorkspaces = createAsyncThunk<Workspace[], number>(
  "workspaces/fetch",
  async (userId, { rejectWithValue }) => {
    try {
      const data = await api.getWorkspacesByUserId(userId);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


interface WorkspaceCreateData {
  name: string;
  backgroundColor: string;
  owner: number;
  members: number[];
}

export const fetchWorkspacesCreate = createAsyncThunk<Workspace, WorkspaceCreateData>(
  "workspaces/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.getInstance().post<strapi.SingleResponse<Workspace>>('workspaces', { data });
      return getMappedResponse(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


