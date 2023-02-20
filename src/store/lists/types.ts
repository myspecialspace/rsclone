import { EntityState } from "@reduxjs/toolkit";
import { FetchState } from "../../helpers/fetch-state";
import { TAttrsBase } from "../../helpers/strapi-types";

export interface State extends EntityState<List> {
  fetchState: FetchState;
  editState: FetchState;
  selectedId: number;
  boardId: number;
}

export interface List extends TAttrsBase {
  id: number;
  // TODO fields from api
  "name": string;
  "createdAt": string;
  "updatedAt": string;
  "publishedAt": string;
  "isFavorite": boolean;
  "description": string;
  "order": number;
}

export interface EditListInterface {
  listId: number;
  patch: {
    name: string;
    order: number;
  }
}