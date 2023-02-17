import { FetchState } from "../../helpers/fetch-state";
import { TAttrsBase } from "../../helpers/strapi-types";
import { User } from "../../types/user";
import { Board } from "../board/types";

export interface Workspace extends TAttrsBase {
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  isFavorite: boolean;
  description: string | null;
  owner: User;
  members: User[];
  boards: Board[];
}

export interface State {
  fetchState: FetchState;
  id: number;
  workspace: Workspace;
}
