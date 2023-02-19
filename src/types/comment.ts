import * as base from './base';

export interface Comment extends base.Comment {
  task: base.Task;
  owner: base.User;
}