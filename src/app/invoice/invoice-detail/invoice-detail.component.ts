import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { IApplicationState } from '../../aplication-state';
import { ErrorMessage } from 'src/app/shared/error-message';
import { ActivatedRoute, Router } from '@angular/router';
import { IInvoice } from '../invoice.interface';
import { loadInvoiceDetail } from '../ngrx/invoice.actions';
import { MatDialog } from '@angular/material/dialog';
import {
  loadInvoiceDetailPending,
  selectInvoices,
  error,
} from '../ngrx/invoice.selectors';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss'],
  animations: [
    trigger('EnterLeave', [
      state('flyIn', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('0.5s 300ms ease-in'),
      ]),
      transition(':leave', [
        animate('0.3s ease-out', style({ transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
})
export class InvoiceDetailComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<IApplicationState>,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {}
  displayedColumns: string[] = ['product', 'description', 'price', 'quantity'];
  invoiceId!: number;
  invoiceDetail$!: Observable<IInvoice[]>;
  loadInvoiceDetailPending$!: Observable<boolean>;
  error!: Subscription;

  ngOnInit(): void {
    this.invoiceId = this.route.snapshot.params.id;
    this.store.dispatch(loadInvoiceDetail.begin({ id: this.invoiceId }));
    this.invoiceDetail$ = this.store.select(selectInvoices);
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
