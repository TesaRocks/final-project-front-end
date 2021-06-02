import { IUser } from '../user.interface';
import { createReducer, on, Action } from '@ngrx/store';
import { getAllUsersActions } from './users.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { state } from '@angular/animations';

//export interface IUsersInitialState extends EntityState<IUser> {
export interface IUsersInitialState {
  users: IUser[];
}
//export const userAdapter: EntityAdapter<IUser> = createEntityAdapter<IUser>();
export const usersInitialState: IUsersInitialState = {
  users: [],
};
//userAdapter.getInitialState({

//users: [],
//  selectedUserId: null,
//});

const userReducer = createReducer(
  usersInitialState,
  on(getAllUsersActions.begin, (state) => ({
    ...state,
  })),
  on(getAllUsersActions.success, (state, { users }) => ({
    ...state,
    users: users,
  })),
  on(getAllUsersActions.deleteUserBegin, (state, { id }) => ({
    ...state,
    users: state.users.filter((user) => {
      return user.id !== id;
    }),
  }))
);
export function userReducerFn(
  state: IUsersInitialState | undefined,
  action: Action
) {
  return userReducer(state, action);
}
// export const getSelectedUserId = (state: IUsersInitialState) =>
//   state.selectedUserId;
// const { selectIds, selectAll } = userAdapter.getSelectors();

// // select the array of user ids
// export const selectUserIds = selectIds;

// // select the array of users
// export const selectAllUsers = selectAll;
