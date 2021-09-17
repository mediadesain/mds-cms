import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';

import { ProductsComponent } from './product/products.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: ':url', component: ProductDetailComponent, data: {title: 'Custom CMS - Detail Produk'} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
