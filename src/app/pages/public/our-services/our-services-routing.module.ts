import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceAComponent } from './service-a/service-a.component';
import { ServiceBComponent } from './service-b/service-b.component';
import { ServiceCComponent } from './service-c/service-c.component';

const routes: Routes = [
  { path: '', redirectTo: 'layanan-a' },
  { path: 'layanan-a', component: ServiceAComponent },
  { path: 'layanan-b', component: ServiceBComponent },
  { path: 'layanan-c', component: ServiceCComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OurServicesRoutingModule { }
