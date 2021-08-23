import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/firebase/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class LoginComponent implements OnInit {
  
  pop:string = '';

  constructor(public _auth: AuthService) {}

  ngOnInit(){}

  masuk(val:any){
    console.log("asd")
    this._auth.signIn(val);
  }
  keluar(){
    console.log(this._auth)
    this._auth.signOut()
  }
  resetSandi(val:any){
    console.log(this._auth)
    this._auth.resetPassword(val.email)
  }
  perbaharuiData(){
    console.log(this._auth.data)
    this._auth.updateDataAuth(this._auth.data)
  }
  daftar(register:any){
    //User Data Structure
    var userdata : any = {
        address : [{ city: "", detail: "", type: "", notes: "", zip: "" }],
        avatar : "",
        fullname: "",
        phone : "",
        role : "user",
        username : ""
    }
    userdata['datecreate'] = new Date().getTime();
    userdata['datelogin'] = new Date().getTime();
    userdata['email'] = register.email;
    userdata['password'] = register.password;
    //console.log('register', userdata)
    this._auth.registerAccount(userdata)
  }
  removeMessage(){
    this._auth.hideMessage()
  }
}
