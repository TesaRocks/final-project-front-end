import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import {
  loadInvoices,
  loadInvoiceById,
  addInvoice,
  countInvoices,
} from './invoice.actions';
import { InvoiceService } from '../invoice.service';
import { Router } from '@angular/router';

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
  countInvoices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(countInvoices.begin),
      mergeMap(() =>
        this.invoiceService.countInvoices().pipe(
          map((count) => countInvoices.success({ totalInvoices: count })),
          catchError((error) => of(countInvoices.failure({ error })))
        )
      )
    )
  );
  createInvoice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addInvoice.begin),
      mergeMap((action) =>
        this.invoiceService.newInvoice(action.invoice).pipe(
          map((invoice) => addInvoice.success({ invoice })),
          catchError((error) => of(addInvoice.failure({ error })))
        )
      ),
      tap(() =>
        this.router.navigate(['invoice'], { queryParams: { page: '1' } })
      )
    )
  );
  constructor(
    private actions$: Actions,
    private invoiceService: InvoiceService,
    private router: Router
  ) {}
}
