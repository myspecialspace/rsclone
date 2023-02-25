import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';
import { getMappedResponse } from '../../helpers/strapi';
import * as strapi from '../../helpers/strapi-types';
import { Board, DeleteBoard, UpdateDeleteBoard } from './types';

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
export const updateBoard = createAsyncThunk<Board, UpdateDeleteBoard>(
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
