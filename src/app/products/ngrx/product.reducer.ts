import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IProduct } from '../product.interface';

import { deleteProduct, loadProduct, loadProducts } from './product.actions';

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
  next: boolean;
  previous: boolean;
}
export function selectProductId(product: IProduct): number {
  return product.productId;
}
export const adapter: EntityAdapter<IProduct> = createEntityAdapter<IProduct>({
  selectId: selectProductId,
});

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
    next: false,
    previous: false,
  });

export const reducer = createReducer(
  productsInitialState,
  // Load Products
  on(loadProducts.begin, (state) => {
    return { ...state, loadProductsPending: true };
  }),
  on(loadProducts.success, (state, action) => {
    return {
      ...adapter.setAll(action.pagination.products, state),
      loadProductsPending: false,
      next: action.pagination.next?.page ? true : false,
      previous: action.pagination.previous?.page ? true : false,
    };
  }),
  on(loadProducts.failure, (state, action) => {
    return {
      ...state,
      loadProductsPending: false,
      error: action.error,
    };
  }),
  // Load Product
  on(loadProduct.begin, (state) => {
    return { ...state, loadProductPending: true };
  }),
  on(loadProduct.success, (state, action) => {
    return {
      ...state,
      loadProductPending: false,
      selectedUser: action.selectedProduct,
    };
  }),

  on(loadProduct.failure, (state, action) => {
    return {
      ...state,
      loadProductPending: false,
      error: action.error,
    };
  }),
  // Delete User
  on(deleteProduct.begin, (state) => {
    return { ...state, deleteProductPending: true };
  }),
  on(deleteProduct.success, (state, action) => {
    return {
      ...adapter.removeOne(action.id, state),
      deleteProductPending: false,
    };
  }),
  on(deleteProduct.failure, (state, action) => {
    return {
      ...state,
      deleteProductPending: false,
      error: action.error,
    };
  })
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
