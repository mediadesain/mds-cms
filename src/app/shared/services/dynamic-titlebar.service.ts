/*---------- Documented by Mediadesain ----------
1. Put This DyamicTitlebarService on app.component constructor
2. Set the titlebar router on each router condition
{
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    data: {title: 'Mediadesain - Home'} <--- Put your Data TitleBar Here
},
*/

import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DyamicTitlebarService {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map( () => {
        let child = this.activatedRoute.firstChild;
        if (!child)
          return this.activatedRoute.snapshot.data.title;
        while (child.firstChild)
          child = child.firstChild;
        if (child.snapshot.data.title)
          return child.snapshot.data.title;
      })
    ).subscribe( (title: string) => this.title.setTitle(title) );
  }

}
