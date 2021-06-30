import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { loadInvoiceDetail } from './invoice-detail.actions';
import { InvoiceService } from '../../invoice.service';

@Injectable()
export class InvoiceDetailEffects {
  loadInvoiceDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadInvoiceDetail.begin),
      mergeMap((action) =>
        this.invoiceService.fetchInvoiceDetail(action.id).pipe(
          map((invoiceDetail) =>
            loadInvoiceDetail.success({ invoiceDetail: invoiceDetail })
          ),
          catchError((error) => of(loadInvoiceDetail.failure({ error })))
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private invoiceService: InvoiceService
  ) {}
}
