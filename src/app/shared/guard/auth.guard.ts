

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/firebase-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  adminlist:string[] = [
    "51zvf1CzoiUzMn89JTA2KMkkt913",
    "GD4uN4hAJ2co2TgSZAdHv1L6tJC2",
    "e7hPtS9bsLWVMwb8x2MmqMp0ZwQ2"
  ]
  constructor(
    private auth : AuthService,
    private router : Router
  ) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    var uid = await this.auth.getUid();
    //console.log('uid',uid)
    if(this.adminlist.includes(uid))
      return true
    else{
      this.router.navigate(['../../account']);
      return false
    }
    //this.auth.getDataAuth().then( (x:any)=>console.log(x) )
    // if(localStorage.getItem('login:guard'))
    //   return true
    // else{
    //   this.router.navigate(['/account']);
    //   return false
    // }
  }

  // canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  // boolean | Observable<boolean> | Promise<boolean> {
  //   return this.canActivate(route, state);
  // }


}