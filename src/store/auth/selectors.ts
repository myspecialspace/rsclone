import { AppState } from "../index";

export const authSelectors = {
  userId: (state: AppState) => state.auth.userId,
  editState: (state: AppState) => state.auth.editState,
}