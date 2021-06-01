import { IUser } from '../user.interface';
import { createReducer, on, Action } from '@ngrx/store';
import { getAllUsersActions } from './users.actions';

export interface IUsersInitialState {
  users: IUser[];
  connectPending: boolean;
  connectError: any;
}
export const usersInitialState: IUsersInitialState = {
  users: [],
  connectPending: false,
  connectError: null,
};

const userReducer = createReducer(
  usersInitialState,
  on(getAllUsersActions.begin, (usersInitialState) => ({
    ...usersInitialState,
    connectPending: true,
    connectError: null,
  })),
  on(getAllUsersActions.success, (usersInitialState, { users }) => ({
    ...usersInitialState,
    users: users,
    connectPending: false,
    connectError: null,
  })),
  on(getAllUsersActions.failure, (usersInitialState, { error }) => ({
    ...usersInitialState,
    connectPending: false,
    connectError: error,
  }))
);

export function userReducerFn(
  state: IUsersInitialState | undefined,
  action: Action
) {
  return userReducer(state, action);
}
