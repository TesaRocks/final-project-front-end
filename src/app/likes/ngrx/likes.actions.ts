import { createAction, props } from '@ngrx/store';
import { IProduct } from 'src/app/products/product.interface';

/** **************************************
 *  Load Likes By UserId
 ***************************************/

const loadLikesByUserIdBegin = createAction(
  '[Likes] Load LikesByUserId Begin',
  props<{ id: string }>()
);

const loadLikesByUserIdSuccess = createAction(
  '[Likes] Load LikesByUserId Success',
  props<{ likesByUserId: IProduct[] }>()
);

const loadLikesByUserIdFailure = createAction(
  '[Likes] Load LikesByUserId Failure',
  props<{ error: any }>()
);
export const loadLikesByUserId = {
  begin: loadLikesByUserIdBegin,
  success: loadLikesByUserIdSuccess,
  failure: loadLikesByUserIdFailure,
};

/** **************************************
 *  New Like
 ***************************************/

const newLikeBegin = createAction(
  '[Likes] New Like Begin',
  props<{ id: number }>()
);

const newLikeSuccess = createAction(
  '[Likes] New Like Success',
  props<{ newLike: IProduct }>()
);

const newLikeFailure = createAction(
  '[Likes] New Like Failure',
  props<{ error: any }>()
);
export const newLike = {
  begin: newLikeBegin,
  success: newLikeSuccess,
  failure: newLikeFailure,
};
