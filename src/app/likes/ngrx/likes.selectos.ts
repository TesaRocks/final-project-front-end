import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  ILikesInitialState,
  likesFeatureKey,
  selectAll,
} from './likes.reducer';
export const selectLikesState =
  createFeatureSelector<ILikesInitialState>(likesFeatureKey);

export const selectLikesByUserId = createSelector(selectLikesState, selectAll);
export const loadLikesByUserIdPending = createSelector(
  selectLikesState,
  (state: ILikesInitialState) => state.loadLikesByUserIdPending
);
export const error = createSelector(
  selectLikesState,
  (state: ILikesInitialState) => state.error
);
