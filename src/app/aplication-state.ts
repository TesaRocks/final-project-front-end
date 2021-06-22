import { IProductsInitialState } from './products/store/product.reducer';
import { IUsersInitialState } from './users/store/user.reducer';

export interface IApplicationState {
  userState: IUsersInitialState;
  productState: IProductsInitialState;
}
