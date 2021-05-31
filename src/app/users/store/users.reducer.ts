import { IUser } from '../user.interface';
import { createReducer, on, Action } from '@ngrx/store';
import { getAllUsersActions } from './users.actions';

export interface IUsersInitialState {
  users: IUser[];
  getAllUsersPending: boolean;
  getAllUsersError: any;
}
export const usersInitialState: IUsersInitialState = {
  users: [],
  getAllUsersPending: false,
  getAllUsersError: null,
};

const userReducer = createReducer(
  usersInitialState,
  on(getAllUsersActions.begin, (usersInitialState) => ({
    ...usersInitialState,
    getAllUsersPending: true,
    getAllUsersError: null,
  })),
  on(getAllUsersActions.success, (usersInitialState, { users }) => ({
    ...usersInitialState,
    users: users,
    getAllUsersPending: false,
    getAllUsersError: null,
  })),
  on(getAllUsersActions.failure, (usersInitialState, { error }) => ({
    ...usersInitialState,
    getAllUsersPending: false,
    getAllUsersError: error,
  }))
);

export function userReducerFn(
  state: IUsersInitialState | undefined,
  action: Action
) {
  return userReducer(state, action);
}

// const userReducer = createReducer(
//   usersInitialState,
//   on(getAllUsersActions.begin, (state) => ({
//     ...state,
//     getAllUsersPending: true,
//     getAllUsersError: null,
//   })),
//   on(getAllUsersActions.success, (state, Action) => ({
//     ...state,
//     users: Action.users,
//     getAllUsersPending: false,
//     getAllUsersError: null,
//   })),
//   on(getAllUsersActions.failure, (state, action) => ({
//     ...state,
//     getAllUsersPending: false,
//     getAllUsersError: action.error,
//   }))
// );
