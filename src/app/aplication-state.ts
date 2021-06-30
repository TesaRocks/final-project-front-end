import { IInvoiceDetailInitialState } from './invoice/invoice-detail/ngrx/invoice-detail.reducer';
import { IInvoiceInitialState } from './invoice/invoice-list/ngrx/invoice-list.reducer';
import { IProductsInitialState } from './products/ngrx/product.reducer';
import { IUsersInitialState } from './users/ngrx/user.reducer';

export interface IApplicationState {
  userState: IUsersInitialState;
  productState: IProductsInitialState;
  invoiceState: IInvoiceInitialState;
  invoiceDetailState: IInvoiceDetailInitialState;
}
