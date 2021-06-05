import {
  ActionReducer,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on,
  Action,
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { IUser } from '../user.interface';
import * as userActions from './users.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export const userStateFeatureKey = 'userState';

export interface UserState extends EntityState<IUser> {
  error: any;
}
export const adapter: EntityAdapter<IUser> = createEntityAdapter<IUser>();

export const userInitialState: UserState = adapter.getInitialState({
  error: undefined,
});

export const reducers = createReducer(
  userInitialState,
  on(userActions.loadUsersSuccess, (state, { users }) => {
    return adapter.setAll(users, state);
  }),
  on(userActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    error: error,
  }))
);

export const selectUserFeature =
  createFeatureSelector<UserState>(userStateFeatureKey);

export const selectUsers = createSelector(
  selectUserFeature,
  adapter.getSelectors().selectAll
);
export const selectError = createSelector(
  selectUserFeature,
  (state: UserState) => state.error
);

export const metaReducers: MetaReducer<UserState>[] = !environment.production
  ? []
  : [];
