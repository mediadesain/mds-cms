
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  public isConnected : boolean = false;

  constructor(
    private router: Router,
  ) {
    //console.log('Connection Service');
    window.addEventListener('load', () => {
      if(navigator.onLine){
        this.isConnected = true;
      } else {
        this.isConnected = false;
        this.router.navigateByUrl('/offline');
      }
      window.addEventListener('online', () => this.isConnected = true);
      window.addEventListener('offline', () => {
        this.isConnected = false;
        this.router.navigateByUrl('/offline');
      });
    });
  }

  
}
