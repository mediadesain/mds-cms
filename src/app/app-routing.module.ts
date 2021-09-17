import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './shared/guard/auth.guard';

import { HomeComponent } from './pages/public/home/home.component';
import { LoginComponent } from './shared/components/auth/auth.component';
import { ErrorPageComponent } from './shared/components/error/error.component';
import { OfflineMessageComponent } from './shared/components/offline-message/offline-message.component';

const routes: Routes = [
  //{ path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', component: HomeComponent, data: {title: 'Custom CMS - Home'} },
  { path: 'layanan', loadChildren: () => import('./pages/public/our-services/our-services.module').then(m => m.OurServicesModule), data: {title: 'Custom CMS - Our Services'} },
  { path: 'produk', loadChildren: () => import('./pages/public/products/products.module').then(m => m.ProductsModule), data: {title: 'Custom CMS - Produk'} },
  { path: 'tentang-kami', loadChildren: () => import('./pages/public/about/about.module').then(m => m.AboutModule), data: {title: 'Custom CMS - Tentang Kami'} },
  { path: 'hubungi-kami', loadChildren: () => import('./pages/public/contact/contact.module').then(m => m.ContactModule), data: {title: 'Custom CMS - Hubungi Kami'} },
  { path: 'account', component: LoginComponent, data: {title: 'Custom CMS - Akun'} },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuardService]
  },
  { path: '404', component: ErrorPageComponent, data: {title: 'Custom CMS - Halaman Tidak Ditemukan'} },
  { path: 'offline', component: OfflineMessageComponent, data: {title: 'Custom CMS - Tidak Ada Koneksi'} },
  { path: '**', redirectTo: '404', data: {title: 'Custom CMS - Home'} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }