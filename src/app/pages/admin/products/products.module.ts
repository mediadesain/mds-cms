import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './product/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { MdsFilterCheckboxModule, MdsPipesModule } from 'mds-library';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProductsRoutingModule,
    MdsFilterCheckboxModule,
    MdsPipesModule
  ]
})
export class ProductsModule { }
