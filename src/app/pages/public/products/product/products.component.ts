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

  constructor(
    public _auth: AuthService,
    private _database: DatabaseService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    var reference = { url: '/product', query: false}
    this._database
      .getDatabase(reference)
      .then((val:any) => {
        var ArrayModified:any = {};
        console.log(Object.values(val))
        ArrayModified['products'] = Object.values(val).filter( (a:any) => a.status == 'published');
        ArrayModified['total'] = ArrayModified.products.length;
        this.data = ArrayModified;

        console.group('Product Page')
          console.log("Auth",this._auth)
          console.log("Data List",this.data);
        console.groupEnd()
      })
  };

  

}