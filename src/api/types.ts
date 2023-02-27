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

export interface ListPostInterface {
  data: {
    name: string,
    description?: string,
    board?: number,
    order?: number
  }
}

export interface TaskPostInterface {
  data: {
    name: string,
    list: number,
    order: number
  }
}