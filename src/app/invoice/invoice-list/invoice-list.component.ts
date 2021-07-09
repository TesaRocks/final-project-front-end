import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { IApplicationState } from '../../aplication-state';
import { IInvoice } from '../invoice.interface';
import { loadInvoices } from '../ngrx/invoice.actions';
import {
  loadInvoicesPending,
  selectInvoices,
  error,
} from '../ngrx/invoice.selectors';
import { MatDialog } from '@angular/material/dialog';
import { ErrorMessage } from 'src/app/shared/error-message';

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
  error!: Subscription;
  currentPage!: number;
  previousPage!: number;
  nextPage!: number;
  displayedColumns: string[] = ['name', 'date', 'action'];

  ngOnInit(): void {
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
  onNext() {
    this.nextPage = this.currentPage + 1;
    this.router.navigate(['/invoice'], {
      queryParams: { page: this.nextPage },
    });
  }
  onPrevious() {
    this.previousPage = this.currentPage - 1;
    this.router.navigate(['/invoice'], {
      queryParams: { page: this.previousPage },
    });
  }
  ngOnDestroy() {
    this.error.unsubscribe();
  }
}
