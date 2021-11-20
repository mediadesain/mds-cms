import { Component, OnInit } from '@angular/core';
import { EmployeesService } from 'src/app/core/services/employees.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html'
})
export class EmployeesComponent implements OnInit {
data : any;
  filterBy : string[] = ['status','gender','group']
  filterSelected = {}
  page = 1
  constructor(
    public userSrvc: EmployeesService
  ) {
    console.log('zxczxc',this.userSrvc)
  }

  ngOnInit() {
    
  }

}
