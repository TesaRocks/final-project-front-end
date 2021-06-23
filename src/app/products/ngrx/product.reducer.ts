import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IProduct } from '../product.interface';

import { loadProducts } from './product.actions';

export const productsFeatureKey = 'productsState';

export interface IProductsInitialState extends EntityState<IProduct> {
  // additional entities state properties
  error: any;
  selectedProduct: IProduct | null;
  loadProductsPending: boolean;
  loadProductPending: boolean;
  addProductPending: boolean;
  updateProductPending: boolean;
  deleteProductPending: boolean;
}

export const adapter: EntityAdapter<IProduct> = createEntityAdapter<IProduct>();

export const productsInitialState: IProductsInitialState =
  adapter.getInitialState({
    // additional entity state properties
    error: null,
    selectedProduct: null,
    loadProductsPending: false,
    loadProductPending: false,
    addProductPending: false,
    updateProductPending: false,
    deleteProductPending: false,
  });

export const reducer = createReducer(
  productsInitialState,
  // Load Products
  on(loadProducts.begin, (state) => {
    return { ...state, loadProductsPending: true };
  }),
  on(loadProducts.success, (state, action) => {
    return {
      ...adapter.setAll(action.products, state),
      loadProductsPending: false,
    };
  }),
  on(loadProducts.failure, (state, action) => {
    return {
      ...state,
      loadProductsPending: false,
      error: action.error,
    };
  })
);
export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();