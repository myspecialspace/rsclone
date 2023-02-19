import { TAttrsBase } from "../helpers/strapi-types";

export interface User extends TAttrsBase {
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  backgroundColor: string | null;
  theme: Theme;
}

export enum Theme {
  SYSTEM = 'system',
  LIGHT = 'light',
  DARK = 'dark',
}