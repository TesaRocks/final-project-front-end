import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { IInvoiceDetail } from '../../invoice-invoiceDetail.interface';

/** **************************************
 *  Load Invoice Detail
 ***************************************/

const loadInvoiceDetailBegin = createAction(
  '[Invoice Detail] Load InvoiceDetail Begin',
  props<{ id: number }>()
);

const loadInvoiceDetailSuccess = createAction(
  '[Invoice Detail] Load InvoiceDetail Success',
  props<{ invoiceDetail: IInvoiceDetail[] }>()
);

const loadInvoiceDetailFailure = createAction(
  '[Invoice Detail] Load Invoices Failure',
  props<{ error: any }>()
);
export const loadInvoiceDetail = {
  begin: loadInvoiceDetailBegin,
  success: loadInvoiceDetailSuccess,
  failure: loadInvoiceDetailFailure,
};
