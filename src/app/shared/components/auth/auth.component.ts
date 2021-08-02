import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class LoginComponent implements OnInit {
  
  pop:string = '';

  constructor(public auth: AuthService) {}

  ngOnInit(){}

  masuk(val:any){
    console.log("asd")
    this.auth.signIn(val);
  }
  keluar(){
    console.log(this.auth)
    this.auth.signOut()
  }
  resetSandi(val:any){
    console.log(this.auth)
    this.auth.resetPassword(val.email)
  }
  perbaharuiData(){
    console.log(this.auth.data)
    this.auth.updateDataAuth(this.auth.data)
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
    this.auth.registerAccount(userdata)
  }
  removeMessage(){
    this.auth.hideMessage()
  }
}
