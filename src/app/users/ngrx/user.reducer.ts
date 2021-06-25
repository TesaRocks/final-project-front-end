import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IUser } from '../user.interface';
import {
  addUser,
  loadUser,
  loadUsers,
  deleteUser,
  updateUser,
} from './user.actions';

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
  // Add One User
  on(addUser.begin, (state) => {
    return { ...state, addUserPending: true };
  }),
  on(addUser.success, (state, action) => {
    return {
      ...adapter.addOne(action.user, state),
      addUserPending: false,
    };
  }),
  on(addUser.failure, (state, action) => {
    return {
      ...state,
      addUserPending: false,
      error: action.error,
    };
  }),
  // Load Users
  on(loadUsers.begin, (state) => {
    return { ...state, loadUsersPending: true };
  }),
  on(loadUsers.success, (state, action) => {
    return { ...adapter.setAll(action.users, state), loadUsersPending: false };
  }),
  on(loadUsers.failure, (state, action) => {
    return {
      ...state,
      loadUsersPending: false,
      error: action.error,
    };
  }),
  // Load User
  on(loadUser.begin, (state) => {
    return { ...state, loadUserPending: true };
  }),
  on(loadUser.success, (state, action) => {
    return {
      ...state,
      loadUserPending: false,
      selectedUser: action.selectedUser,
    };
  }),

  on(loadUser.failure, (state, action) => {
    return {
      ...state,
      loadUserPending: false,
      error: action.error,
    };
  }),
  // Update User
  on(updateUser.success, (state, action) =>
    adapter.updateOne(action.user, state)
  ),
  // Delete User
  on(deleteUser.begin, (state) => {
    return { ...state, deleteUserPending: true };
  }),
  on(deleteUser.success, (state, action) => {
    return { ...adapter.removeOne(action.id, state), deleteUserPending: false };
  }),
  on(deleteUser.failure, (state, action) => {
    return {
      ...state,
      deleteUserPending: false,
      error: action.error,
    };
  })
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
