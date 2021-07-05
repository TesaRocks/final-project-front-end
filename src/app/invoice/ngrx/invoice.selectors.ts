import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  IInvoiceInitialState,
  invoiceFeatureKey,
  selectAll,
} from './invoice.reducer';

export const selectInvoiceState =
  createFeatureSelector<IInvoiceInitialState>(invoiceFeatureKey);

export const selectInvoices = createSelector(selectInvoiceState, selectAll);

export const selectInvoiceById = createSelector(
  selectInvoiceState,
  (state: IInvoiceInitialState) => state.selectedInvoice
);

export const loadInvoicesPending = createSelector(
  selectInvoiceState,
  (state: IInvoiceInitialState) => state.loadInvoicesPending
);
export const loadInvoiceByIdPending = createSelector(
  selectInvoiceState,
  (state: IInvoiceInitialState) => state.loadInvoiceByIdPending
);

export const error = createSelector(
  selectInvoiceState,
  (state: IInvoiceInitialState) => state.error
);
