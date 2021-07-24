import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { IApplicationState } from '../../aplication-state';
import { IInvoice } from '../invoice.interface';
import { countInvoices, loadInvoices } from '../ngrx/invoice.actions';
import {
  loadInvoicesPending,
  selectInvoices,
  error,
  totalInvoices,
} from '../ngrx/invoice.selectors';
import { MatDialog } from '@angular/material/dialog';
import { ErrorMessage } from 'src/app/shared/error-message';
import { PageEvent } from '@angular/material/paginator';
import { updateHeader } from 'src/app/ngrx/header.actions';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss'],
})
export class InvoiceListComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<IApplicationState>,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router
  ) {}
  invoices$!: Observable<IInvoice[]>;
  loadInvoicesPending$!: Observable<boolean>;
  totalInvoices$!: Observable<number>;
  error!: Subscription;
  currentPage!: number;
  previousPage!: number;
  nextPage!: number;
  displayedColumns: string[] = ['name', 'date', 'action'];

  ngOnInit(): void {
    this.store.dispatch(updateHeader({ updatedHeader: 'List of Invoices' }));
    this.store.dispatch(countInvoices.begin());
    this.totalInvoices$ = this.store.select(totalInvoices);

    this.route.queryParams.subscribe((params: Params) => {
      this.currentPage = parseInt(params['page']);
      this.previousPage = this.currentPage - 1;
      this.store.dispatch(loadInvoices.begin({ page: params['page'] }));
      this.invoices$ = this.store.select(selectInvoices);
      this.loadInvoicesPending$ = this.store.select(loadInvoicesPending);
      this.error = this.store.select(error).subscribe((error) => {
        if (error) {
          let errorDialog = this.dialog.open(ErrorMessage, {
            data: { message: error.message },
          });
          errorDialog.afterClosed().subscribe(() => {
            this.router.navigate(['']);
          });
        }
      });
    });
  }
  onViewProducts(invoiceId: number) {
    this.router.navigate(['invoice', 'detail', invoiceId]);
  }

  onChangePage(event: PageEvent) {
    this.nextPage = event.pageIndex + 1;
    this.router.navigate(['/invoice'], {
      queryParams: { page: this.nextPage },
    });
  }
  ngOnDestroy() {
    this.error.unsubscribe();
  }
}
