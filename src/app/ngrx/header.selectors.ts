import { createFeatureSelector, createSelector } from '@ngrx/store';
import { headerFeatureKey, IHeaderInitialState } from './header.reducer';

export const selectHeaderState =
  createFeatureSelector<IHeaderInitialState>(headerFeatureKey);
export const updateHeaderSelector = createSelector(
  selectHeaderState,
  (state: IHeaderInitialState) => state.header
);
