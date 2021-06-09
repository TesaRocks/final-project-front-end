import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IUsersInitialState, usersFeatureKey, selectAll } from './user.reducer';

export const selectUserState =
  createFeatureSelector<IUsersInitialState>(usersFeatureKey);

export const selectUsers = createSelector(selectUserState, selectAll);
export const selectUser = createSelector(
  selectUserState,
  (state: IUsersInitialState) => state.selectedUser
);
