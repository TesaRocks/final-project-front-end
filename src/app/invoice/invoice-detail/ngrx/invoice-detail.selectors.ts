import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  IInvoiceDetailInitialState,
  invoiceDetailFeatureKey,
  selectAll,
} from './invoice-detail.reducer';

export const selectInvoiceDetailState =
  createFeatureSelector<IInvoiceDetailInitialState>(invoiceDetailFeatureKey);

export const selectInvoiceDetail = createSelector(
  selectInvoiceDetailState,
  selectAll
);

export const loadInvoiceDetailPending = createSelector(
  selectInvoiceDetailState,
  (state: IInvoiceDetailInitialState) => state.loadInvoiceDetailPending
);
export const error = createSelector(
  selectInvoiceDetailState,
  (state: IInvoiceDetailInitialState) => state.error
);
