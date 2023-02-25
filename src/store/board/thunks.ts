import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';
import { getMappedResponse } from '../../helpers/strapi';
import * as strapi from '../../helpers/strapi-types';
import { Task } from '../../types/base';
import { List } from '../../types/list';
import { Board, DeleteBoard, UpdateData } from './types';

export const fetchBoard = createAsyncThunk<Board, number>(
  'board/fetch',
  async (boardId, { rejectWithValue }) => {
    try {
      const response = await api
        .getInstance()
        .get<strapi.SingleResponse<Board>>(
          `boards/${boardId}?populate=workspace,lists.tasks,members,owner`
        );
      const data = getMappedResponse(response.data);
      //   console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteBoard = createAsyncThunk<Board, DeleteBoard>(
  'board/delete',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api
        .getInstance()
        .delete<strapi.SingleResponse<Board>>(`boards/${data.boardId}`);
      return getMappedResponse(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const updateBoard = createAsyncThunk<Board, UpdateData>(
  'board/update',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api
        .getInstance()
        .put<strapi.SingleResponse<Board>>(`boards/${data.boardId}`, { data });
      return getMappedResponse(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export interface EditListOrderData {
  listId: number;
  patch: {
    order: number;
  }
}

export const editListOrder = createAsyncThunk<List, EditListOrderData>(
  "lists/update/order",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.getInstance().put<strapi.SingleResponse<List>>(`lists/${data.listId}`, { data: data.patch });
      return getMappedResponse(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export interface EditTaskOrderData {
  taskId: number;
  listId: number;
  patch: {
    order: number;
  }
}

export const editTaskOrder = createAsyncThunk<Task, EditTaskOrderData>(
  "tasks/update/order",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.getInstance().put<strapi.SingleResponse<Task>>(`tasks/${data.taskId}`, { data: data.patch });
      return getMappedResponse(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);