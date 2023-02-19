import * as base from './base';

export interface List extends base.List {
  board: base.Board;
  owner: base.User;
  tasks: base.Task[];
}