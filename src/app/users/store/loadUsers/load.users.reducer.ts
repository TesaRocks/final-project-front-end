import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IUser } from '../../user.interface';
import { loadUsers } from './load.users.actions';

export const usersFeatureKey = 'userState';

export interface UserState extends EntityState<IUser> {
  // additional entities state properties
  error: any;
  selectedUser: IUser | undefined;
}

export const adapter: EntityAdapter<IUser> = createEntityAdapter<IUser>();

export const initialState: UserState = adapter.getInitialState({
  // additional entity state properties
  error: undefined,
  selectedUser: undefined,
});

export const loadUsersReducer = createReducer(
  initialState,
  on(loadUsers.success, (state, action) => adapter.setAll(action.users, state)),
  on(loadUsers.failure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  })
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
