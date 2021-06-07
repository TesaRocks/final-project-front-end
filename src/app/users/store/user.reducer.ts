import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IUser } from '../user.interface';
import * as UserActions from './user.actions';

export const usersFeatureKey = 'userState';

export interface UserState extends EntityState<IUser> {
  // additional entities state properties
  error: any;
  selectedUser: IUser;
}

export const adapter: EntityAdapter<IUser> = createEntityAdapter<IUser>();

export const initialState: UserState = adapter.getInitialState({
  // additional entity state properties
  error: undefined,
  selectedUser: undefined,
});

export const reducer = createReducer(
  initialState,
  on(UserActions.addUser.successAdd, (state, action) =>
    adapter.addOne(action.user, state)
  ),
  on(UserActions.addUser.failureAdd, (state, action) => {
    return {
      ...state,
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
  on(UserActions.loadUser.successLoad, (state, action) => {
    return {
      ...state,
      selectedUser: action.selectedUser,
    };
  }),
  on(UserActions.loadUser.failureLoad, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(UserActions.updateUser.beginUpdate, (state, action) =>
    adapter.updateOne(action.user, state)
  ),
  on(UserActions.deleteUser.successDelete, (state, action) =>
    adapter.removeOne(action.id, state)
  ),
  on(UserActions.deleteUser.failureDelete, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  })
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
