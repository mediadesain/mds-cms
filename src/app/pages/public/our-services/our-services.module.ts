import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OurServicesRoutingModule } from './our-services-routing.module';
import { ServiceAComponent } from './service-a/service-a.component';
import { ServiceBComponent } from './service-b/service-b.component';
import { ServiceCComponent } from './service-c/service-c.component';

@NgModule({
  declarations: [ ServiceAComponent, ServiceBComponent, ServiceCComponent],
  imports: [
    CommonModule,
    OurServicesRoutingModule
  ]
})
export class OurServicesModule { }
