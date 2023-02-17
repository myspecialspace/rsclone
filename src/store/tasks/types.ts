import { EntityState } from "@reduxjs/toolkit";
import { FetchState } from "../../helpers/fetch-state";
import { TAttrsBase } from "../../helpers/strapi-types";
import { List } from "../lists/types";

export interface State extends EntityState<Task> {
  fetchState: FetchState;
  selectedId: number;
}

export interface Task extends TAttrsBase {
  id: number;
  "name": string;
  "createdAt": string;
  "updatedAt": string;
  "publishedAt": string;
  "description": string | null;
  "backgroundColor": string | null;
  "isCompleted": false,
  "date_to_complete": string | null;
  "order": number;
  list: List;
}