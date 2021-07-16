import { NgModule } from '@angular/core';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { RouterModule } from '@angular/router';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import * as fromInvoice from './ngrx/invoice.reducer';
import { InvoiceEffects } from './ngrx/invoice.effects';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { InvoiceNewComponent } from './invoice-new/invoice-new.component';
import { ShortPipe } from './invoice-detail/short.pipe';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    InvoiceListComponent,
    InvoiceDetailComponent,
    InvoiceNewComponent,
    ShortPipe,
  ],
  imports: [
    RouterModule,
    InvoiceRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromInvoice.invoiceFeatureKey, fromInvoice.reducer),

    EffectsModule.forFeature([InvoiceEffects]),
  ],
})
export class InvoiceModule {}
