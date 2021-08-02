import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit {
  data : any;
  filterBy : string[] = ['status','gender','group']
  filterSelected = {}
  page = 1
  constructor(private http : HttpClient) { }

  ngOnInit(): void {
    this.http.get("https://mygsapi.firebaseio.com/v2/item-test.json").subscribe(
      (data) => {
        this.data = Object.values(data);
        this.data.forEach((element:any,key:number) => {
          element.img = 'https://picsum.photos/200/300?random='+ key+1
        });
        console.log("Sumber data api", this.data);
        console.log("Sumber data api", [...new Set(this.data.map((a:any)=>a.group))]);
      },
      (err) => { console.log("Jika error", err) },
      () => { console.log("Pemeberitahuan Parsing Data Selesai") }
    );

  }

}
