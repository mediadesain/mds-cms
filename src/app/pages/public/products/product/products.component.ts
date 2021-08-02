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
    public auth: AuthService,
    private dbservice: DatabaseService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    var reference = { url: '/product', query: false}
    this.dbservice
      .getDatabase(reference)
      .then((val:any) => {
        var ArrayModified:any = {};
        ArrayModified['products'] = Object.values(val).filter( (a:any) => a.status == 'published');
        ArrayModified['total'] = ArrayModified.products.length;
        this.data = ArrayModified;

        console.group('Product Page')
          console.log("Auth",this.auth)
          console.log("Data List",this.data);
        console.groupEnd()
      })
  };

  

}