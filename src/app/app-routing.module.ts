import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './shared/guard/auth.guard';

import { HomeComponent } from './pages/public/home/home.component';
import { LoginComponent } from './shared/components/auth/auth.component';
import { ErrorPageComponent } from './shared/components/error/error.component';
import { OfflineMessageComponent } from './shared/components/offline-message/offline-message.component';

const routes: Routes = [
  //{ path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'layanan', loadChildren: () => import('./pages/public/our-services/our-services.module').then(m => m.OurServicesModule) },
  { path: 'produk', loadChildren: () => import('./pages/public/products/products.module').then(m => m.ProductsModule) },
  { path: 'tentang-kami', loadChildren: () => import('./pages/public/about/about.module').then(m => m.AboutModule) },
  { path: 'hubungi-kami', loadChildren: () => import('./pages/public/contact/contact.module').then(m => m.ContactModule) },
  { path: 'account', component: LoginComponent },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuardService]
  },
  { path: '404', component: ErrorPageComponent},
  { path: 'offline', component: OfflineMessageComponent},
  { path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }