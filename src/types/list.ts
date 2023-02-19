import { TAttrsBase } from "../helpers/strapi-types";
import { Board } from "./board";
import { Task } from "./task";
import { User } from "./user";

export interface List extends TAttrsBase {
  name: string;
  description: string;
  order: number;
  board: Board;
  owner: User;
  tasks: Task[];
}