import { TAttrsBase } from '../../helpers/strapi-types';
import { EntityState } from "@reduxjs/toolkit";
import { FetchState } from "../../helpers/fetch-state";

export interface State extends EntityState<Comment> {
  fetchState: FetchState;
  selectedId: number;
}

export interface Comment extends TAttrsBase {
    task: number;
    content: string;
  }