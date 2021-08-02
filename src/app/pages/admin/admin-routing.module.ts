import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { OurServiceComponent } from './our-service/our-service.component';
import { ErrorPageComponent } from 'src/app/shared/components/error/error.component';
import { LoginComponent } from 'src/app/shared/components/auth/auth.component';

const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: HomeComponent },
    { path: 'order', component: OrderComponent },
    { path: 'product', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
    { path: 'services', component: OurServiceComponent },
    { path: 'account', component: LoginComponent },
    { path: '404', component: ErrorPageComponent},
    { path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
