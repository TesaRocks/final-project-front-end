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
