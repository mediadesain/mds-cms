import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MdsFilterModule, MdsPipesModule } from 'medes-ui';

@NgModule({
  declarations: [
    EmployeesComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    MdsFilterModule,
    MdsPipesModule,
    NgxPaginationModule
  ]
})
export class EmployeesModule { }
