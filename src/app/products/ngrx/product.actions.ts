import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { IProduct } from '../product.interface';

/** **************************************
 *  Load Products Paginated
 ***************************************/

const loadProductsPaginatedBegin = createAction(
  '[Product] Load Products Paginated Begin',
  props<{ page: string }>()
);

const loadProductsPaginatedSuccess = createAction(
  '[Product] Load Products Paginated Success',
  props<{ products: IProduct[] }>()
);

const loadProductsPaginatedFailure = createAction(
  '[Product] Load Products Failure',
  props<{ error: any }>()
);
export const loadProductsPaginated = {
  begin: loadProductsPaginatedBegin,
  success: loadProductsPaginatedSuccess,
  failure: loadProductsPaginatedFailure,
};
/** **************************************
 *  Load Products All (no pagination)
 ***************************************/

const loadProductsAllBegin = createAction('[Product] Load Products All Begin');

const loadProductsAllSuccess = createAction(
  '[Product] Load Products All Success',
  props<{ products: IProduct[] }>()
);

const loadProductsAllFailure = createAction(
  '[Product] Load Products All Failure',
  props<{ error: any }>()
);
export const loadProductsAll = {
  begin: loadProductsAllBegin,
  success: loadProductsAllSuccess,
  failure: loadProductsAllFailure,
};

/** **************************************
 *  Count Products
 ***************************************/

const countProductsBegin = createAction('[Product] Count Products Begin');

const countProductsSuccess = createAction(
  '[Product] Count Products Success',
  props<{ totalProducts: number }>()
);

const countProductsFailure = createAction(
  '[Product] Count Products Failure',
  props<{ error: any }>()
);
export const countProducts = {
  begin: countProductsBegin,
  success: countProductsSuccess,
  failure: countProductsFailure,
};

/** **************************************
 *  Load Product
 ***************************************/
const loadProductBegin = createAction(
  '[Product] Load Product Begin',
  props<{ id: number }>()
);
const loadProductSuccess = createAction(
  '[Product] Load Product Success',
  props<{ selectedProduct: IProduct }>()
);
const loadProductFailure = createAction(
  '[Product] Load Product Failure',
  props<{ error: any }>()
);
export const loadProduct = {
  begin: loadProductBegin,
  success: loadProductSuccess,
  failure: loadProductFailure,
};

/** **************************************
 *  Delete Product
 ***************************************/

const deleteProductBegin = createAction(
  '[Product] Delete Product Begin',
  props<{ id: number }>()
);

const deleteProductSuccess = createAction(
  '[Product] Delete Products Success',
  props<{ id: number }>()
);
const deleteProductFailure = createAction(
  '[Product] Delete Product Failure',
  props<{ error: any }>()
);
export const deleteProduct = {
  begin: deleteProductBegin,
  success: deleteProductSuccess,
  failure: deleteProductFailure,
};

/** **************************************
 *  Populate Invoice
 ***************************************/
const populateInvoiceBegin = createAction(
  '[Invoice] Populate Invoice Begin',
  props<{ id: number }>()
);

const addProduct = createAction(
  '[Invoice] Add Product Begin',
  props<{ product: IProduct }>()
);

const upsertProduct = createAction(
  '[Product/API] Upsert Product',
  props<{ product: IProduct }>()
);

const addProducts = createAction(
  '[Product/API] Add Products',
  props<{ products: IProduct[] }>()
);

const updateProduct = createAction(
  '[Product/API] Update Product',
  props<{ product: Update<IProduct> }>()
);

const updateProducts = createAction(
  '[Product/API] Update Products',
  props<{ products: Update<IProduct>[] }>()
);

const clearProducts = createAction('[Product/API] Clear Products');
