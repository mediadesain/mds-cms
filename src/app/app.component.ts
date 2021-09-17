import { Component } from '@angular/core';
import { DyamicTitlebarService } from './shared/services/dynamic-titlebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public:boolean = true;

  constructor(
    public dynamicTitlebarSrvc: DyamicTitlebarService
  ) {}

  ngOnInit(){
    if(location.pathname.includes('admin'))
        this.public = false
  }
}
