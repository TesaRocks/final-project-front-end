import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProductsListComponent } from './product-list/products-list.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { ProductsRoutingModule } from './products-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromProduct from './ngrx/product.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './ngrx/product.effects';

@NgModule({
  declarations: [ProductsListComponent],
  imports: [
    SharedModule,
    RouterModule,
    MaterialModule,
    ProductsRoutingModule,
    StoreModule.forFeature(fromProduct.productsFeatureKey, fromProduct.reducer),
    EffectsModule.forFeature([ProductEffects]),
  ],
})
export class ProductsModule {}
