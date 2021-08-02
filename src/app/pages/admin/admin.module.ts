import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { OurServiceComponent } from './our-service/our-service.component';


@NgModule({
  declarations: [HomeComponent, OrderComponent, OurServiceComponent],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
