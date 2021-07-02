import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  IInvoiceInitialState,
  invoiceFeatureKey,
  selectAll,
} from './invoice.reducer';

export const selectInvoiceState =
  createFeatureSelector<IInvoiceInitialState>(invoiceFeatureKey);

export const selectInvoices = createSelector(selectInvoiceState, selectAll);

export const loadInvoicesPending = createSelector(
  selectInvoiceState,
  (state: IInvoiceInitialState) => state.loadInvoicesPending
);

// export const loadInvoiceDetailPending = createSelector(
//   selectInvoiceState,
//   (state: IInvoiceGlobalInitialState) => state.loadInvoiceDetailPending
// );
export const error = createSelector(
  selectInvoiceState,
  (state: IInvoiceInitialState) => state.error
);
