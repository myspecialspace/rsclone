import { EntityState } from "@reduxjs/toolkit";
import { FetchState } from "../../helpers/fetch-state";
import { TAttrsBase } from "../../helpers/strapi-types";

export interface State extends EntityState<Workspace> {
  fetchState: FetchState;
  selectedId: number;
}


export interface Workspace extends TAttrsBase {
  id: number;
  "name": string;
  "createdAt": string;
  "updatedAt": string;
  "publishedAt": string;
  "isFavorite": boolean;
  "description": string;
}