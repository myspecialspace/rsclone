import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";
import { User } from "./types";

export const fetchUser = createAsyncThunk<User, number>(
  "auth/user/fetch",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getInstance().get<User>(`users/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

interface EditUserData {
  userId: number;
  patch: {
    backgroundColor: string;
    theme: string;
  }
}

export const editUser = createAsyncThunk<User, EditUserData>(
  "auth/user/edit",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.getInstance().put<User>(`users/${data.userId}`, data.patch);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


