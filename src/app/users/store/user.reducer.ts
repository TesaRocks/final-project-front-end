import { Action, createReducer, on } from '@ngrx/store';
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
  on(UserActions.addUserSuccess, (state, action) =>
    adapter.addOne(action.user, state)
  ),
  on(UserActions.addUserFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(UserActions.loadUsersSuccess, (state, action) =>
    adapter.setAll(action.users, state)
  ),
  on(UserActions.loadUsersFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(UserActions.loadUserSuccess, (state, action) => {
    return {
      ...state,
      selectedUser: action.selectedUser,
    };
  }),
  on(UserActions.loadUsersFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(UserActions.updateUser, (state, action) =>
    adapter.updateOne(action.user, state)
  ),
  on(UserActions.deleteUser, (state, action) =>
    adapter.removeOne(action.id, state)
  )
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
