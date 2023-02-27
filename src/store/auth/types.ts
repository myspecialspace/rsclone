import { FetchState } from '../../helpers/fetch-state';
import { User as BaseUser } from '../../types/user';

export interface User extends BaseUser { }

export interface State {
  user: User;
  jwt: string;
  userId: number;
  fetchState: FetchState;
  editState: FetchState;
}
