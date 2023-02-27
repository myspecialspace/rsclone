import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';
import { getMappedResponse } from '../../helpers/strapi';
import * as strapi from '../../helpers/strapi-types';
import { Board } from '../boards/types';
import { UpDateWorkspace, Workspace } from './types';

export const fetchWorkspace = createAsyncThunk<Workspace, number>(
  'workspace/fetch',
  async (workspaceId, { rejectWithValue }) => {
    try {
      const response = await api
        .getInstance()
        .get<strapi.SingleResponse<Workspace>>(
          `workspaces/${workspaceId}?populate=owner,members,boards`
        );
      const data = getMappedResponse(response.data);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

interface CreateBoardData {
  name: string;
  workspace: number;
  backgroundColor: string;
  members: number[];
  owner: number;
  description: string;
  isFavorite: boolean;
  isPrivate: boolean;
  isClosed: boolean;
}

export const fetchCreateBoard = createAsyncThunk<Board, CreateBoardData>(
  'workspace/board/create',
  async (postData, { rejectWithValue }) => {
    try {
      const response = await api
        .getInstance()
        .post<strapi.SingleResponse<Board>>('boards', { data: postData });
      const data = getMappedResponse(response.data);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const updateWorkspace = createAsyncThunk<Board, UpDateWorkspace>(
  'workspace/update',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api
        .getInstance()
        .put<strapi.SingleResponse<Workspace>>(
          `workspaces/${data.workspaceId}`,
          {
            data,
          }
        );

      return getMappedResponse(response.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
