import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { ProductsRoutingModule } from './products-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromProduct from './store/product.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './store/product.effects';

@NgModule({
  declarations: [ProductsComponent],
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
