import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceComponent } from './invoice.component';
import { RouterModule } from '@angular/router';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  declarations: [InvoiceComponent],
  imports: [CommonModule, RouterModule, InvoiceRoutingModule, MaterialModule],
})
export class InvoiceModule {}
