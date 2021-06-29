import { IInvoiceInitialState } from './invoice/ngrx/invoice.reducer';
import { IProductsInitialState } from './products/ngrx/product.reducer';
import { IUsersInitialState } from './users/ngrx/user.reducer';

export interface IApplicationState {
  userState: IUsersInitialState;
  productState: IProductsInitialState;
  invoiceState: IInvoiceInitialState;
}
