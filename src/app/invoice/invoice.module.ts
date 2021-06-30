import { NgModule } from '@angular/core';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { RouterModule } from '@angular/router';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from '../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import * as fromInvoice from './invoice-list/ngrx/invoice-list.reducer';
import * as fromInvoiceDetail from './invoice-detail/ngrx/invoice-detail.reducer';
import { InvoiceEffects } from './invoice-list/ngrx/invoice-list.effects';
import { InvoiceDetailEffects } from './invoice-detail/ngrx/invoice-detail.effects';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';

@NgModule({
  declarations: [InvoiceListComponent, InvoiceDetailComponent],
  imports: [
    RouterModule,
    InvoiceRoutingModule,
    MaterialModule,
    SharedModule,
    StoreModule.forFeature(fromInvoice.invoiceFeatureKey, fromInvoice.reducer),
    StoreModule.forFeature(
      fromInvoiceDetail.invoiceDetailFeatureKey,
      fromInvoiceDetail.reducer
    ),
    EffectsModule.forFeature([InvoiceEffects, InvoiceDetailEffects]),
  ],
})
export class InvoiceModule {}
