import { IProductsInitialState } from './products/ngrx/product.reducer';
import { IUsersInitialState } from './users/ngrx/user.reducer';

export interface IApplicationState {
  userState: IUsersInitialState;
  productState: IProductsInitialState;
}
