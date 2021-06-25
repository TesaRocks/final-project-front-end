import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { IProduct } from '../product.interface';
import { IPagination } from '../product-list/pagination.interface';

/** **************************************
 *  Load Products
 ***************************************/

const loadProductsBegin = createAction(
  '[Product] Load Products Begin',
  props<{ page: string; limit: string }>()
);

const loadProductsSuccess = createAction(
  '[Product] Load Products Success',
  props<{ pagination: IPagination<IProduct[]> }>()
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

const addProduct = createAction(
  '[Product/API] Add Product',
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

const upsertProducts = createAction(
  '[Product/API] Upsert Products',
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

const deleteProduct = createAction(
  '[Product/API] Delete Product',
  props<{ id: string }>()
);

const deleteProducts = createAction(
  '[Product/API] Delete Products',
  props<{ ids: string[] }>()
);

const clearProducts = createAction('[Product/API] Clear Products');
