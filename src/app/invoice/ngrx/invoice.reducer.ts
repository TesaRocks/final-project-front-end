import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IInvoice } from '../invoice.interface';
import {
  loadInvoices,
  loadInvoiceById,
  addInvoice,
  countInvoices,
} from './invoice.actions';

export const invoiceFeatureKey = 'invoiceState';

export interface IInvoiceInitialState extends EntityState<IInvoice> {
  // additional entities state properties
  error: any;
  selectedInvoice: IInvoice;
  loadInvoicesPending: boolean;
  loadInvoiceByIdPending: boolean;
  addInvoicePending: boolean;
  updateInvoicePending: boolean;
  deleteInvoicePending: boolean;
  totalInvoices: number;
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
    selectedInvoice: {} as IInvoice,
    loadInvoicesPending: false,
    loadInvoiceByIdPending: false,
    addInvoicePending: false,
    updateInvoicePending: false,
    deleteInvoicePending: false,
    items: null,
    totalInvoices: 0,
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
  }),
  // Load Invoice by Id
  on(loadInvoiceById.begin, (state) => {
    return { ...state, loadInvoiceByIdPending: true };
  }),
  on(loadInvoiceById.success, (state, action) => {
    return {
      ...state,
      loadInvoiceByIdPending: false,
      selectedInvoice: action.invoiceById,
    };
  }),
  on(loadInvoiceById.failure, (state, action) => {
    return {
      ...state,
      loadInvoiceDetailPending: false,
      error: action.error,
    };
  }),
  // Count Invoices
  on(countInvoices.begin, (state) => {
    return { ...state };
  }),
  on(countInvoices.success, (state, action) => {
    return {
      ...state,
      totalInvoices: action.totalInvoices,
    };
  }),
  on(countInvoices.failure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),

  // Add one Invoice
  on(addInvoice.begin, (state) => {
    return { ...state, addInvoicePending: true };
  }),
  on(addInvoice.success, (state, action) => {
    return {
      ...adapter.addOne(action.invoice, state),
      addInvoicePending: false,
    };
  }),
  on(addInvoice.failure, (state, action) => {
    return {
      ...state,
      addInvoicePending: false,
      error: action.error,
    };
  })
);
export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
