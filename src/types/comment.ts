import { TAttrsBase } from "../helpers/strapi-types";
import { Task } from "./task";
import { User } from "./user";

export interface Comment extends TAttrsBase {
  content: string;
  task: Task;
  owner: User;
}