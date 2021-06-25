import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  IProductsInitialState,
  productsFeatureKey,
  selectAll,
} from './product.reducer';

export const selectProductState =
  createFeatureSelector<IProductsInitialState>(productsFeatureKey);

export const selectProducts = createSelector(selectProductState, selectAll);
export const loadProductsPending = createSelector(
  selectProductState,
  (state: IProductsInitialState) => state.loadProductsPending
);
export const error = createSelector(
  selectProductState,
  (state: IProductsInitialState) => state.error
);
