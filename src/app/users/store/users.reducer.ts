import { IUser } from '../user.interface';
import { Action, createReducer, on, State } from '@ngrx/store';
import * as UsersActions from './users.actions';

export interface IUsersInitialState {
  users: IUser[];
}
export const usersInitialState: IUsersInitialState = {
  users: [],
};

const _usersReducer = createReducer(
  usersInitialState,
  on(UsersActions.users_loaded_success, (state) => ({
    ...state,
    users: state.users,
  }))
);

export function usersReducer(state: State<IUsersInitialState>, action: Action) {
  return _usersReducer(state, action);
}
