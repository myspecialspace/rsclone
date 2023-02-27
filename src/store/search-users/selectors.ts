import { AppState } from "..";

export const search = (state: AppState) => state.searchUsers.search;
export const fetchState = (state: AppState) => state.searchUsers.fetchState;
export const users = (state: AppState) => state.searchUsers.users;