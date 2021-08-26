import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GetDataInterface } from 'src/app/shared/interfaces/database.interface';
import { DatabaseService } from 'src/app/shared/services/database.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {
  data : any;
  filterBy : string[] = ['brand','category'];
  filterSelected : any = {};
  filterDropdown : string = "";
  constructor(
    public _auth: AuthService,
    public _database: DatabaseService
  ) {}

  ngOnInit(): void {
    const reference: GetDataInterface = { isArray: true, url: '/v2/products', query: false }
    this._database.getDatabase(reference).then(
      (val:any) => {
        //Data
        var ArrModified:any = {};
        ArrModified['products'] = Object.values(val);
        ArrModified['status'] = {};
        ArrModified.status['total'] = ArrModified.products.length;
        ArrModified.status['draft'] = ArrModified.products.filter( (a:any) => a.status == 'draft').length;
        ArrModified.status['unlisted'] = ArrModified.products.filter( (a:any) => a.status == 'unlisted').length;
        ArrModified.status['published'] = ArrModified.products.filter( (a:any) => a.status == 'published').length;
        this.data = ArrModified;
        
        console.group('Product Page - Admin')
          console.log("Auth",this._auth)
          console.log("Database Service",this._database)
          console.log("Data List",this.data)
        console.groupEnd()
      }
    )
  }
  
}