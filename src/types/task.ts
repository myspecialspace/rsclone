import * as base from './base';

export interface Task extends base.Task {
  owner: base.User;
  list: base.List;
  members: base.User[];
  comments: base.Comment[];
}