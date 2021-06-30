import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IInvoice } from '../../invoice-invoiceDetail.interface';
import { loadInvoices } from './invoice-list.actions';

export const invoiceFeatureKey = 'invoiceState';

export interface IInvoiceInitialState extends EntityState<IInvoice> {
  // additional entities state properties
  error: any;
  selectedInvoice: IInvoice | null;
  loadInvoicesPending: boolean;
  loadInvoicePending: boolean;
  addInvoicePending: boolean;
  updateInvoicePending: boolean;
  deleteInvoicePending: boolean;
}
export function selectInvoiceId(invoice: IInvoice): number {
  return invoice.invoiceId;
}
export const adapter: EntityAdapter<IInvoice> = createEntityAdapter<IInvoice>({
  selectId: selectInvoiceId,
});

export const invoiceInitialState: IInvoiceInitialState =
  adapter.getInitialState({
    // additional entity state properties
    error: null,
    selectedInvoice: null,
    loadInvoicesPending: false,
    loadInvoicePending: false,
    addInvoicePending: false,
    updateInvoicePending: false,
    deleteInvoicePending: false,
  });

export const reducer = createReducer(
  invoiceInitialState,
  // Load Invoices
  on(loadInvoices.begin, (state) => {
    return { ...state, loadInvoicesPending: true };
  }),
  on(loadInvoices.success, (state, action) => {
    return {
      ...adapter.setAll(action.invoices, state),
      loadInvoicesPending: false,
    };
  }),
  on(loadInvoices.failure, (state, action) => {
    return {
      ...state,
      loadInvoicesPending: false,
      error: action.error,
    };
  })
);
export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
