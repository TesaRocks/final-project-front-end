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
 *  Load Invoice By Id
 ***************************************/

const loadInvoiceByIdBegin = createAction(
  '[Invoice] Load InvoiceById Begin',
  props<{ id: number }>()
);

const loadInvoiceByIdSuccess = createAction(
  '[Invoice] Load InvoiceById Success',
  props<{ invoiceById: IInvoice }>()
);

const loadInvoiceByIdFailure = createAction(
  '[Invoice] Load InvoiceById Failure',
  props<{ error: any }>()
);
export const loadInvoiceById = {
  begin: loadInvoiceByIdBegin,
  success: loadInvoiceByIdSuccess,
  failure: loadInvoiceByIdFailure,
};
