import { User } from "../types/user";
import { USER_BG_COLOR } from "./defaults";

export const getFirstChar = (user: User): string => (user.username || '')[0]?.toUpperCase();
export const getBgColor = (user: User) => user.backgroundColor || USER_BG_COLOR;