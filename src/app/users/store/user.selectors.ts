import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  UserState,
  usersFeatureKey,
  selectAll,
} from './loadUsers/load.users.reducer';

export const selectUserState =
  createFeatureSelector<UserState>(usersFeatureKey);

export const selectUsers = createSelector(selectUserState, selectAll);
export const selectUser = createSelector(
  selectUserState,
  (state: UserState) => state.selectedUser
);
