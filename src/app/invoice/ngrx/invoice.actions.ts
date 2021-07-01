import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { IInvoice } from '../invoice.interface';

/** **************************************
 *  Load Invoices
 ***************************************/

const loadInvoicesBegin = createAction(
  '[Invoice] Load Invoices Begin',
  props<{ page: string }>()
);

const loadInvoicesSuccess = createAction(
  '[Invoice] Load Invoices Success',
  props<{ invoices: IInvoice[] }>()
);

const loadInvoicesFailure = createAction(
  '[Invoice] Load Invoices Failure',
  props<{ error: any }>()
);
export const loadInvoices = {
  begin: loadInvoicesBegin,
  success: loadInvoicesSuccess,
  failure: loadInvoicesFailure,
};
/** **************************************
 *  Load Invoice Detail
 ***************************************/

const loadInvoiceDetailBegin = createAction(
  '[Invoice] Load InvoiceDetail Begin',
  props<{ id: number }>()
);

const loadInvoiceDetailSuccess = createAction(
  '[Invoice] Load InvoiceDetail Success',
  props<{ invoiceDetail: IInvoice[] }>()
);

const loadInvoiceDetailFailure = createAction(
  '[Invoice] Load Invoices Failure',
  props<{ error: any }>()
);
export const loadInvoiceDetail = {
  begin: loadInvoiceDetailBegin,
  success: loadInvoiceDetailSuccess,
  failure: loadInvoiceDetailFailure,
};
