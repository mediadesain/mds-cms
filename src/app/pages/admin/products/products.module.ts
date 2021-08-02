import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './product/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
//import { FilterCheckboxComponent } from 'src/app/components/filter-checkbox/filter-checkbox.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductDetailComponent,
    //FilterCheckboxComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProductsRoutingModule,
    SharedModule
  ]
})
export class ProductsModule { }
