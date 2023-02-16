import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";
import { API_BASE } from "../../helpers/api";
import { Workspace } from './types';


export const fetchWorkspaces = createAsyncThunk<Workspace[], string>(
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

