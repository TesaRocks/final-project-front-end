import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { IApplicationState } from '../../aplication-state';
import { ErrorMessage } from 'src/app/shared/error-message';
import { ActivatedRoute, Router } from '@angular/router';
import { IInvoiceDetail } from '../invoice-invoiceDetail.interface';
import { loadInvoiceDetail } from './ngrx/invoice-detail.actions';
import { MatDialog } from '@angular/material/dialog';
import {
  loadInvoiceDetailPending,
  selectInvoiceDetail,
  error,
} from './ngrx/invoice-detail.selectors';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss'],
})
export class InvoiceDetailComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<IApplicationState>,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {}
  invoiceId!: number;
  invoiceDetail$!: Observable<IInvoiceDetail[]>;
  loadInvoiceDetailPending$!: Observable<boolean>;
  error!: Subscription;

  ngOnInit(): void {
    this.invoiceId = this.route.snapshot.params.id;
    this.store.dispatch(loadInvoiceDetail.begin({ id: this.invoiceId }));
    this.invoiceDetail$ = this.store.select(selectInvoiceDetail);
    this.loadInvoiceDetailPending$ = this.store.select(
      loadInvoiceDetailPending
    );
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
  }
  ngOnDestroy() {
    this.error.unsubscribe();
  }
}
