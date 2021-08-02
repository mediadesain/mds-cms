import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public:boolean = true;

  constructor() {}

  ngOnInit(){
    if(location.pathname.includes('admin'))
        this.public = false
  }
}
