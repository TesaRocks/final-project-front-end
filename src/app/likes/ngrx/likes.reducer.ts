import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IProduct } from 'src/app/products/product.interface';

export const likesFeatureKey = 'likesState';

export interface ILikesInitialState extends EntityState<IProduct> {
  // additional entities state properties
  error: any;
  loadLikesByUserIdPending: boolean;
  addLikesByUserIdPending: boolean;
  deleteLikesByUserIdPending: boolean;
}
