import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { IProduct } from '../product.interface';

/** **************************************
 *  Load Products
 ***************************************/

const loadProductsBegin = createAction(
  '[Product] Load Products Begin',
  props<{ page: string }>()
);

const loadProductsSuccess = createAction(
  '[Product] Load Products Success',
  props<{ products: IProduct[] }>()
);

const loadProductsFailure = createAction(
  '[Product] Load Products Failure',
  props<{ error: any }>()
);
export const loadProducts = {
  begin: loadProductsBegin,
  success: loadProductsSuccess,
  failure: loadProductsFailure,
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
