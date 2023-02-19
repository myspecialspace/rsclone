import { TAttrsBase } from "../helpers/strapi-types";
import { List } from "./list";
import { User } from "./user";

export interface Task extends TAttrsBase {
  name: string;
  description: string;
  backgroundColor: string;
  isCompleted: boolean;
  dateToComplete: string;
  order: number;
  owner: User;
  list: List;
  members: User[];
  comments: Comment[];
}