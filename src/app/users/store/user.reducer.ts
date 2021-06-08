import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IUser } from '../user.interface';
import * as UserActions from './user.actions';

export const usersFeatureKey = 'userState';

export interface IUsersInitialState extends EntityState<IUser> {
  // additional entities state properties
  error: any;
  selectedUser: IUser | null;

  loadUsersPending: boolean;
  loadUserPending: boolean;
  addUserPending: boolean;
  updateUserPending: boolean;
  deleteUserPending: boolean;
}

export const adapter: EntityAdapter<IUser> = createEntityAdapter<IUser>();

export const usersInitialState: IUsersInitialState = adapter.getInitialState({
  // additional entity state properties
  error: null,
  selectedUser: null,
  loadUsersPending: false,
  loadUserPending: false,
  addUserPending: false,
  updateUserPending: false,
  deleteUserPending: false,
});

export const reducer = createReducer(
  usersInitialState,
  on(UserActions.addUser.begin, (state, action) => {
    return { ...state, addUserPending: true, error: null };
  }),
  on(UserActions.addUser.success, (state, action) => {
    return {
      ...adapter.addOne(action.user, state),
      addUserPending: false,
      error: null,
    };
  }),
  on(UserActions.addUser.failure, (state, action) => {
    return {
      ...state,
      addUserPending: false,
      error: action.error,
    };
  }),
  on(UserActions.loadUsers.success, (state, action) =>
    adapter.setAll(action.users, state)
  ),
  on(UserActions.loadUsers.failure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(UserActions.loadUser.success, (state, action) => {
    return {
      ...state,
      selectedUser: action.selectedUser,
    };
  }),

  on(UserActions.loadUser.failure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(UserActions.updateUser.begin, (state, action) =>
    adapter.updateOne(action.user, state)
  ),
  on(UserActions.deleteUser.success, (state, action) =>
    adapter.removeOne(action.id, state)
  ),
  on(UserActions.deleteUser.failure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  })
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
