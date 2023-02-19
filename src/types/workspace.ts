import { Board } from "./board";
import { List } from "./list";
import { User } from "./user";
import * as base from './base';

export interface Workspace extends base.Workspace {
  owner: User;
  workspaces: Workspace[];
  lists: List[];
  members: User[];
  boards: Board[];
}