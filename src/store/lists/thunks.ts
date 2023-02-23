import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';
import { getMappedResponse } from '../../helpers/strapi';
import {
  List,
  EditListInterface,
  EditListOrderInterface,
  EditListDeleteInterface,
} from './types';
import * as strapi from '../../helpers/strapi-types';

export const fetchLists = createAsyncThunk<List[], number>(
  'lists/fetch',
  async (boardId, { rejectWithValue }) => {
    try {
      console.log('boarddddd', boardId);
      const response = await api
        .getInstance()
        .get<strapi.CollectionResponse<List>>(
          `lists?filters[board][id]=${boardId}`
        );
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
  owner: number;
}

export const fetchCreate = createAsyncThunk<List, CreateData>(
  'lists/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api
        .getInstance()
        .post<strapi.SingleResponse<List>>('lists', { data });
      return getMappedResponse(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const editList = createAsyncThunk<List, EditListInterface>(
  'lists/update',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api
        .getInstance()
        .put<strapi.SingleResponse<List>>(`lists/${data.listId}`, { data });
      return getMappedResponse(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const editListOrder = createAsyncThunk<List, EditListOrderInterface>(
  'lists/update',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api
        .getInstance()
        .put<strapi.SingleResponse<List>>(`lists/${data.listId}`, { data });
      return getMappedResponse(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteList = createAsyncThunk<List, EditListDeleteInterface>(
  'lists/delete',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api
        .getInstance()
        .delete<strapi.SingleResponse<List>>(`lists/${data.listId}`);
      return getMappedResponse(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
