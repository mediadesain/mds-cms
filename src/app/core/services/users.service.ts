import { Injectable } from '@angular/core';
import { GetDataInterface } from 'src/app/shared/interfaces/database.interface';
import { DatabaseService } from 'src/app/shared/services/database.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  data: any[] = []; // Partial data will showing on page
  
  constructor(
    public databaseSrvc: DatabaseService,
    private storageSrvc: StorageService
  ) {
    if (this.data.length == 0){
      this.getData()
    }
  }

  getData(){
    // Get all data and set initial partial items
    var reference: GetDataInterface = { isArray: true, url: '/v2/item-test', query: false, /*key: 'gender', value: 'sss'*/ }
    this.databaseSrvc.getDatabase(reference).then(
      (val) => {
        this.data = val;
        this.data.forEach((element:any,key:number) => {
          element.img = 'https://picsum.photos/200/300?random='+ key+1;
          element.group = element.group.split(',')
        });
        console.log("Sumber data api", this.data);
      }
    )
  }

  getDataDetail(id: string){
    // Get Detail Item
    
  }

}
