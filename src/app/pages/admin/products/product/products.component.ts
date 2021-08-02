import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
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
    public auth: AuthService,
    private dbservice: DatabaseService
  ) {}

  ngOnInit(): void {
    console.log("Auth",this.auth)

    var reference = { url: '/product', query: false }
    this.dbservice.getDatabase(reference).then(
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
          console.log("Auth",this.auth)
          console.log("Data List",this.data);
        console.groupEnd()
      }
    )
  }
  
}