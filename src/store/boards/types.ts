import { EntityState } from "@reduxjs/toolkit";
import { FetchState } from "../../helpers/fetch-state";
import { TAttrsBase } from "../../helpers/strapi-types";

export interface State extends EntityState<Board> {
  fetchState: FetchState;
}

export interface Board extends TAttrsBase {
  id: number;
  "name": string;
  "createdAt": string;
  "updatedAt": string;
  "publishedAt": string;
  "description": string;
  "isFavorite": boolean;
  "isClosed": boolean;
  "backgroundColor": string;
  "isPrivate": boolean;
}