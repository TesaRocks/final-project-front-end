import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IInvoice, IItem } from '../invoice.interface';
import { loadInvoices, loadInvoiceDetail } from './invoice.actions';

export const invoiceFeatureKey = 'invoiceState';

export interface IInvoiceInitialState extends EntityState<IInvoice> {
  // additional entities state properties
  error: any;
  selectedInvoice: IInvoice | null;
  loadInvoicesPending: boolean;
  loadInvoiceDetailPending: boolean;
  addInvoicePending: boolean;
  updateInvoicePending: boolean;
  deleteInvoicePending: boolean;
  items: EntityState<IItem> | null;
}
export function selectInvoiceId(invoice: IInvoice): number {
  return invoice.invoiceId;
}
export const adapter: EntityAdapter<IInvoice> = createEntityAdapter<IInvoice>({
  selectId: selectInvoiceId,
});
export function selectInvoiceDetailId(item: IItem): number {
  return item.invoiceDetailId;
}
export const adapterDetail: EntityAdapter<IItem> = createEntityAdapter<IItem>({
  selectId: selectInvoiceDetailId,
});

export const invoiceInitialState: IInvoiceInitialState =
  adapter.getInitialState({
    // additional entity state properties
    error: null,
    selectedInvoice: null,
    loadInvoicesPending: false,
    loadInvoiceDetailPending: false,
    addInvoicePending: false,
    updateInvoicePending: false,
    deleteInvoicePending: false,
    items: null,
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
  // Load Invoice Detail
  on(loadInvoiceDetail.begin, (state) => {
    return { ...state, loadInvoiceDetailPending: true };
  }),
  // on(loadInvoiceDetail.success, (state, action) => {
  //   return {
  //     ...state,
  //     items: adapterDetail.setAll(action.invoiceDetail, state),
  //   };
  // }),
  on(loadInvoiceDetail.failure, (state, action) => {
    return {
      ...state,
      loadInvoiceDetailPending: false,
      error: action.error,
    };
  })
);
export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
