import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductsRoutingModule } from './products-routing.module';
import { MdsFilterCheckboxModule, MdsPipesModule } from 'mds-library';

import { ProductsComponent } from './product/products.component';
import { ProductDetailComponent } from 'src/app/pages/public/products/product-detail/product-detail.component';


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
