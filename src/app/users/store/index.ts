import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on,
  Action,
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { usersInitialState } from '../storess/users.reducer';
import { IUser } from '../user.interface';
import * as userActions from './users.actions';

export const userStateFeatureKey = 'userState';

export interface UserState {
  users: IUser[];
  error: any;
}
export const userInitialState: UserState = {
  users: [],
  error: undefined,
};

export const reducers = createReducer(
  usersInitialState,
  on(userActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users: users,
  })),
  on(userActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    error: error,
  }))
);

export const selectUserFeature =
  createFeatureSelector<UserState>(userStateFeatureKey);

export const selectUsers = createSelector(
  selectUserFeature,
  (state: UserState) => state.users
);

export const metaReducers: MetaReducer<UserState>[] = !environment.production
  ? []
  : [];
