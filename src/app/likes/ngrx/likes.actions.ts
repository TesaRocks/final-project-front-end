import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { IProduct } from 'src/app/products/product.interface';

/** **************************************
 *  Load Likes By UserId
 ***************************************/

const loadLikesByUserIdBegin = createAction(
  '[Likes] Load LikesByUserId Begin',
  props<{ id: number }>()
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
