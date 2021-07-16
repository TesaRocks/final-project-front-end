import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authFeatureKey, IAuthInitialState, selectAll } from './auth.reducer';

export const selectAuthState =
  createFeatureSelector<IAuthInitialState>(authFeatureKey);

export const selectAuth = createSelector(selectAuthState, selectAll);
