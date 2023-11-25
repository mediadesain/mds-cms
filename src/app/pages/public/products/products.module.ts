import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductsRoutingModule } from './products-routing.module';
import { MdsFilterModule, MdsPipesModule } from 'medes-ui';

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
    MdsFilterModule,
    MdsPipesModule
  ]
})
export class ProductsModule { }
