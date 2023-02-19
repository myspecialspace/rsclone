import { TAttrsBase } from "../helpers/strapi-types";
import { List } from "./list";
import { User } from "./user";
import { Workspace } from "./workspace";

export interface Board extends TAttrsBase {
  name: string;
  owner: User;
  description: string;
  isFavorite: boolean;
  isClosed: boolean;
  backgroundColor: string;
  isPrivate: boolean;
  workspaces: Workspace[];
  lists: List[];
  members: User[];
}