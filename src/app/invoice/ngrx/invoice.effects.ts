import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { loadInvoices, loadInvoiceById } from './invoice.actions';
import { InvoiceService } from '../invoice.service';

@Injectable()
export class InvoiceEffects {
  loadInvoices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadInvoices.begin),
      mergeMap((action) =>
        this.invoiceService.fetchInvoicesPaginated(action.page).pipe(
          map((invoice) => loadInvoices.success({ invoices: invoice })),
          catchError((error) => of(loadInvoices.failure({ error })))
        )
      )
    )
  );
  loadInvoiceDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadInvoiceById.begin),
      mergeMap((action) =>
        this.invoiceService.fetchInvoiceById(action.id).pipe(
          map((invoiceById) =>
            loadInvoiceById.success({ invoiceById: invoiceById })
          ),
          catchError((error) => of(loadInvoiceById.failure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private invoiceService: InvoiceService
  ) {}
}
