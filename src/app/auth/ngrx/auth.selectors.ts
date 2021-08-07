import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authFeatureKey, IAuthInitialState, selectAll } from './auth.reducer';

export const selectAuthState =
  createFeatureSelector<IAuthInitialState>(authFeatureKey);

export const selectAuth = createSelector(selectAuthState, selectAll);
export const loginUserPending = createSelector(
  selectAuthState,
  (state: IAuthInitialState) => state.loginUserPending
);
export const error = createSelector(
  selectAuthState,
  (state: IAuthInitialState) => state.error
);
export const haslocalStorage = createSelector(
  selectAuthState,
  (state: IAuthInitialState) => state.hasLocalStorage
);
export const role = createSelector(
  selectAuthState,
  (state: IAuthInitialState) => state.role
);
export const userId = createSelector(
  selectAuthState,
  (state: IAuthInitialState) => state.userId
);
