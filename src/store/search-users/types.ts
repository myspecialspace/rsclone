import { FetchState } from '../../helpers/fetch-state';
import { User as IUser } from '../../types/user';

export type User = IUser;

export interface State {
  fetchState: FetchState;
  users: User[];
  search: string;
}
