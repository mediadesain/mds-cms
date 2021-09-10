import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users.service';
import { GetDataInterface } from 'src/app/shared/interfaces/database.interface';
import { DatabaseService } from 'src/app/shared/services/database.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit {

  data : any;
  filterBy : string[] = ['status','gender','group']
  filterSelected = {}
  page = 1
  constructor(
    public userSrvc: UsersService
  ) {
    console.log('zxczxc',this.userSrvc)
  }

  ngOnInit() {
    
  }

}
