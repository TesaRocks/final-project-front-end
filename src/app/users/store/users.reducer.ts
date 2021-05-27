import { IUser } from '../user.interface';
import { Action, createReducer, on } from '@ngrx/store';
import * as UsersActions from './users.actions';

// export interface IUsersInitialState {
//   users: IUser[];
// }
export const usersInitialState = {
  users: [],
};

const _usersReducer = createReducer(
  usersInitialState,
  on(UsersActions.set_users, (state) => state)
);

export function usersReducer(state: any, action: any) {
  return _usersReducer(state, action);
}
