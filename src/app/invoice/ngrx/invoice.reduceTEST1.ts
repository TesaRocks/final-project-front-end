import { createReducer, on, State } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IInvoice, IItem } from '../invoice.interface';
import { loadInvoices, loadInvoiceDetail } from './invoice.actions';

export const invoiceFeatureKey = 'invoiceState';

interface IInvoiceInitialState extends EntityState<IInvoice> {
  // additional entities state properties
  error: any;
  selectedInvoice: IInvoice | null;
  loadInvoicesPending: boolean;
  addInvoicePending: boolean;
  updateInvoicePending: boolean;
  deleteInvoicePending: boolean;
}
interface IInvoiceDetailInitialState extends EntityState<IItem> {
  error: any;
  loadInvoiceDetailPending: boolean;
}
export interface IInvoiceGlobalInitialState {
  invoice: IInvoiceInitialState;
  detail: IInvoiceDetailInitialState;
}
export function selectInvoiceId(invoice: IInvoice): number {
  return invoice.invoiceId;
}
export function selectInvoiceDetailId(item: IItem): number {
  return item.invoiceDetailId;
}

export const adapterInvoice: EntityAdapter<IInvoice> =
  createEntityAdapter<IInvoice>({
    selectId: selectInvoiceId,
  });
export const adapterDetail: EntityAdapter<IItem> = createEntityAdapter<IItem>({
  selectId: selectInvoiceDetailId,
});
const invoiceInitialState: IInvoiceInitialState =
  adapterInvoice.getInitialState({
    error: null,
    selectedInvoice: null,
    loadInvoicesPending: false,
    addInvoicePending: false,
    updateInvoicePending: false,
    deleteInvoicePending: false,
  });
const invoiceDetailInitialState: IInvoiceDetailInitialState =
  adapterDetail.getInitialState({
    error: null,
    loadInvoiceDetailPending: false,
  });
export const invoiceGlobalInitialState: IInvoiceGlobalInitialState = {
  invoice: invoiceInitialState,
  detail: invoiceDetailInitialState,
};
export const reducer = createReducer(
  invoiceGlobalInitialState,
  // Load Invoices
  on(loadInvoices.begin, (state) => {
    return { ...state, loadInvoicesPending: true };
  }),
  on(loadInvoices.success, (state, action) => {
    return {
      ...state,
      invoice: adapterInvoice.setAll(action.invoices, state.invoice),
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
  on(loadInvoiceDetail.success, (state, action) => {
    return {
      ...state,
      detail: adapterDetail.setAll(action.invoiceDetail, state.detail),
      loadInvoiceDetailPending: false,
    };
  }),
  on(loadInvoiceDetail.failure, (state, action) => {
    return {
      ...state,
      loadInvoiceDetailPending: false,
      error: action.error,
    };
  })
);

export const { selectAll } = adapterInvoice.getSelectors();
//export const { selectAll: selectAlldetail } = adapterDetail.getSelectors();
//export const { selectIds, selectEntities, selectAll, selectTotal } =
// adapter.getSelectors();
