import { IUser } from '../user.interface';
import { Action, createReducer, on } from '@ngrx/store';
import * as UsersActions from './users.actions';

export interface IUsersInitialState {
  users: IUser[];
}
export const usersInitialState: IUsersInitialState = {
  users: [],
};

const _usersReducer = createReducer(
  usersInitialState,
  on(UsersActions.users_loaded_success, (state, { users }) => ({
    ...state,
    users: users,
  }))
);

export function usersReducer(state: any, action: Action) {
  return _usersReducer(state, action);
}
