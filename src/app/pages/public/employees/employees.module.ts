import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MdsFilterCheckboxModule, MdsPipesModule } from 'mds-library';

@NgModule({
  declarations: [
    EmployeesComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    MdsFilterCheckboxModule,
    MdsPipesModule,
    NgxPaginationModule
  ]
})
export class EmployeesModule { }
