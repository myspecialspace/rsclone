import { TAttrsBase } from "../helpers/strapi-types";

export interface CreateWorkspaceData {
  name: string;
  owner: number;
  members: number[];
}

export interface CreateWorkspaceResponse extends TAttrsBase {
  id: number;
  name: string;
  // ...
}