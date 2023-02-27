import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';
import { User } from './types';

export interface SearchUsersData {
  search: string;
}

export const searchUsers = createAsyncThunk<User[], SearchUsersData>(
  'search/users/workspace',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api
        .getInstance()
        .get<User[]>(
          `users?filters[username][$containsi]=${data.search}`,
        );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

