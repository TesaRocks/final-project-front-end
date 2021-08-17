import { createAction, props } from '@ngrx/store';
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

/** **************************************
 *  Count Invoices
 ***************************************/

const countInvoicesBegin = createAction('[Invoice] Count Invoices Begin');

const countInvoicesSuccess = createAction(
  '[Invoice] Count Invoices Success',
  props<{ totalInvoices: number }>()
);

const countInvoicesFailure = createAction(
  '[Invoice] Count Invoices Failure',
  props<{ error: any }>()
);
export const countInvoices = {
  begin: countInvoicesBegin,
  success: countInvoicesSuccess,
  failure: countInvoicesFailure,
};

/** **************************************
 *  Add Invoice
 ***************************************/
const addInvoiceBegin = createAction(
  '[invoice] Add Invoice Begin',
  props<{ invoice: IInvoice }>()
);
const addInvoiceSuccess = createAction(
  '[invoice] Add Invoice Success',
  props<{ invoice: IInvoice }>()
);
const addInvoiceFailure = createAction(
  '[invoice] Add Invoice Failure',
  props<{ error: any }>()
);
export const addInvoice = {
  begin: addInvoiceBegin,
  success: addInvoiceSuccess,
  failure: addInvoiceFailure,
};
