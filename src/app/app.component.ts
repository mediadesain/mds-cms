import { Component } from '@angular/core';
import { ConnectionService } from './shared/services/conection.service';
import { DyamicTitlebarService } from './shared/services/dynamic-titlebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public:boolean = true;

  constructor(
    public connectionSrvc : ConnectionService,
    public dynamicTitlebarSrvc: DyamicTitlebarService
  ) {}

  ngOnInit(){
    if(location.pathname.includes('admin'))
        this.public = false
  }
}
