import * as base from './base';

export interface Board extends base.Board {
  owner: base.User;
  workspace: base.Workspace;
  lists: base.List[];
  members: base.User[];
}