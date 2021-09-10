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

  constructor(
    public authSrvc: AuthService,
    private databaseSrvc: DatabaseService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    var reference: GetDataInterface = { isArray: true, url: '/v2/products', query: false}
    this.databaseSrvc.getDatabase(reference).then(
      (val:any) => {
        var ArrayModified:any = {};
        console.log(Object.values(val))
        ArrayModified['products'] = Object.values(val).filter( (a:any) => a.status == 'published');
        ArrayModified['total'] = ArrayModified.products.length;
        this.data = ArrayModified;

        console.group('Product Page')
          console.log("Auth",this.authSrvc)
          console.log("Data List",this.data);
        console.groupEnd()
      })
  };

  

}