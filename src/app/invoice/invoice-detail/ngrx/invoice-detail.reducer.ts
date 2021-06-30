import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IInvoiceDetail } from '../../invoice-invoiceDetail.interface';
import { loadInvoiceDetail } from './invoice-detail.actions';

export const invoiceDetailFeatureKey = 'invoiceDetailState';

export interface IInvoiceDetailInitialState
  extends EntityState<IInvoiceDetail> {
  // additional entities state properties
  error: any;
  selectedInvoiceDetail: IInvoiceDetail | null;
  loadInvoiceDetailPending: boolean;
}
export function selectInvoiceDetailId(invoiceDetail: IInvoiceDetail): number {
  return invoiceDetail.invoiceDetailId;
}
export const adapter: EntityAdapter<IInvoiceDetail> =
  createEntityAdapter<IInvoiceDetail>({
    selectId: selectInvoiceDetailId,
  });

export const invoiceDetailInitialState: IInvoiceDetailInitialState =
  adapter.getInitialState({
    // additional entity state properties
    error: null,
    selectedInvoiceDetail: null,
    loadInvoiceDetailPending: false,
  });

export const reducer = createReducer(
  invoiceDetailInitialState,
  // Load Invoice Detail
  on(loadInvoiceDetail.begin, (state) => {
    return { ...state, loadInvoiceDetailPending: true };
  }),
  on(loadInvoiceDetail.success, (state, action) => {
    return {
      ...adapter.setAll(action.invoiceDetail, state),
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
export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
