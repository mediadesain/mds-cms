import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductsRoutingModule } from './products-routing.module';

import { ProductsComponent } from './product/products.component';
import { ProductDetailComponent } from 'src/app/pages/public/products/product-detail/product-detail.component';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProductsRoutingModule,
    SharedModule
  ]
})
export class ProductsModule { }
