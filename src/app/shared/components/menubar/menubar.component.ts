import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html'
})
export class MenubarComponent implements OnInit {

  public:boolean = true;

  constructor(
    public auth: AuthService,
    private router: Router
  ) {
    this.router.events.pipe(
      filter( e => e instanceof NavigationEnd)
    ).subscribe( (navEnd: any) => {
      this.public = navEnd.urlAfterRedirects === '/admin' ? false : true;
    })
  }

  ngOnInit(): void {}

}
