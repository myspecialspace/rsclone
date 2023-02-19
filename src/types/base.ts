import { TAttrsBase } from "../helpers/strapi-types";

export interface Board extends TAttrsBase {
  name: string;
  description: string;
  isFavorite: boolean;
  isClosed: boolean;
  backgroundColor: string;
  isPrivate: boolean;
}

export interface Workspace extends TAttrsBase {
  name: string;
  publishedAt: string;
  description: string;
  isFavorite: boolean;
  isClosed: boolean;
  backgroundColor: string;
  isPrivate: boolean;
}

export interface List extends TAttrsBase {
  name: string;
  description: string;
  order: number;
}

export interface Task extends TAttrsBase {
  name: string;
  description: string;
  backgroundColor: string;
  isCompleted: boolean;
  dateToComplete: string;
  order: number;
}

export interface Comment extends TAttrsBase {
  content: string;
}

export interface User extends TAttrsBase {
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  backgroundColor: string | null;
  theme: UserTheme;
}

export enum UserTheme {
  SYSTEM = 'system',
  LIGHT = 'light',
  DARK = 'dark',
}