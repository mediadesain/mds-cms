import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
  public:boolean = true;

  constructor() { }

  ngOnInit(): void {
    if(location.pathname.includes('admin'))
        this.public = false
  }

}
