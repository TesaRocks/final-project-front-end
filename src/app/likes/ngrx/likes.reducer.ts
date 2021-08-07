import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IProduct } from 'src/app/products/product.interface';
import { loadLikesByUserId } from './likes.actions';

export const likesFeatureKey = 'likesState';

export interface ILikesInitialState extends EntityState<IProduct> {
  // additional entities state properties
  error: any;
  loadLikesByUserIdPending: boolean;
  addLikesByUserIdPending: boolean;
  deleteLikesByUserIdPending: boolean;
}
export function selectLikesId(product: IProduct): number {
  return product.productId;
}
export const adapter: EntityAdapter<IProduct> = createEntityAdapter<IProduct>({
  selectId: selectLikesId,
});
export const likesInitialState: ILikesInitialState = adapter.getInitialState({
  // additional entity state properties
  error: null,
  loadLikesByUserIdPending: false,
  addLikesByUserIdPending: false,
  deleteLikesByUserIdPending: false,
});

export const reducer = createReducer(
  likesInitialState,
  // Load Likes by User Id
  on(loadLikesByUserId.begin, (state) => {
    return { ...state, loadLikesByUserIdPending: true };
  }),
  on(loadLikesByUserId.success, (state, action) => {
    return {
      ...adapter.setAll(action.likesByUserId, state),
      loadLikesByUserIdPending: false,
    };
  }),
  on(loadLikesByUserId.failure, (state, action) => {
    return {
      ...state,
      loadLikesByUserIdPending: false,
      error: action.error,
    };
  })
);
export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
