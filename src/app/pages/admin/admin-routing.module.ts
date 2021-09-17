import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { OurServiceComponent } from './our-service/our-service.component';
import { ErrorPageComponent } from 'src/app/shared/components/error/error.component';
import { LoginComponent } from 'src/app/shared/components/auth/auth.component';

const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: HomeComponent, data: {title: 'Custom CMS - Dashbaord'} },
    { path: 'order', component: OrderComponent, data: {title: 'Custom CMS - Order'} },
    { path: 'product', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule), data: {title: 'Custom CMS - Products'} },
    { path: 'services', component: OurServiceComponent, data: {title: 'Custom CMS - Layanan'} },
    { path: 'account', component: LoginComponent, data: {title: 'Custom CMS - Akun Saya'} },
    { path: '404', component: ErrorPageComponent, data: {title: 'Custom CMS - Halaman Tidak Ditemukan'} },
    { path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
