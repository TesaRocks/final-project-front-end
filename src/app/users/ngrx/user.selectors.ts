import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IUsersInitialState, usersFeatureKey, selectAll } from './user.reducer';

export const selectUserState =
  createFeatureSelector<IUsersInitialState>(usersFeatureKey);

export const selectUsers = createSelector(selectUserState, selectAll);
export const selectUser = createSelector(
  selectUserState,
  (state: IUsersInitialState) => state.selectedUser
);
export const loadUsersPending = createSelector(
  selectUserState,
  (state: IUsersInitialState) => state.loadUsersPending
);

export const deleteUserPending = createSelector(
  selectUserState,
  (state: IUsersInitialState) => state.deleteUserPending
);
export const updateUserPending = createSelector(
  selectUserState,
  (state: IUsersInitialState) => state.updateUserPending
);
export const loadUserPending = createSelector(
  selectUserState,
  (state: IUsersInitialState) => state.loadUserPending
);
export const addUserPending = createSelector(
  selectUserState,
  (state: IUsersInitialState) => state.addUserPending
);
export const error = createSelector(
  selectUserState,
  (state: IUsersInitialState) => state.error
);
