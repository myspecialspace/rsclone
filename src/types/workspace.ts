import { TAttrsBase } from "../helpers/strapi-types";
import { List } from "./list";
import { User } from "./user";

export interface Workspace extends TAttrsBase {
  name: string;
  publishedAt: string;
  description: string;
  isFavorite: boolean;
  isClosed: boolean;
  backgroundColor: string;
  isPrivate: boolean;
  owner: User;
  workspaces: Workspace[];
  lists: List[];
  members: User[];
}