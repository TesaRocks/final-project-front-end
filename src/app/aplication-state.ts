import { IAuthInitialState } from './auth/ngrx/auth.reducer';
import { IInvoiceInitialState } from './invoice/ngrx/invoice.reducer';
import { IHeaderInitialState } from './ngrx/header.reducer';
import { IProductsInitialState } from './products/ngrx/product.reducer';
import { IUsersInitialState } from './users/ngrx/user.reducer';

export interface IApplicationState {
  userState: IUsersInitialState;
  productState: IProductsInitialState;
  invoiceState: IInvoiceInitialState;
  authState: IAuthInitialState;
  headerState: IHeaderInitialState;
}
