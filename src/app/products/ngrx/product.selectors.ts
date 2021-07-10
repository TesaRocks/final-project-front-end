import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  IProductsInitialState,
  productsFeatureKey,
  selectAll,
} from './product.reducer';

export const selectProductState =
  createFeatureSelector<IProductsInitialState>(productsFeatureKey);

export const selectProducts = createSelector(selectProductState, selectAll);

export const selectProduct = createSelector(
  selectProductState,
  (state: IProductsInitialState) => state.selectedProduct
);
export const totalProducts = createSelector(
  selectProductState,
  (state: IProductsInitialState) => state.totalProducts
);
export const loadProductsPending = createSelector(
  selectProductState,
  (state: IProductsInitialState) => state.loadProductsPending
);
export const error = createSelector(
  selectProductState,
  (state: IProductsInitialState) => state.error
);

export const loadProductPending = createSelector(
  selectProductState,
  (state: IProductsInitialState) => state.loadProductPending
);
export const deleteProductPending = createSelector(
  selectProductState,
  (state: IProductsInitialState) => state.deleteProductPending
);
