import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/firebase-auth.service';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html'
})
export class MenubarComponent implements OnInit {

  public:boolean = true;

  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    if(location.pathname.includes('admin'))
        this.public = false
  }

}
