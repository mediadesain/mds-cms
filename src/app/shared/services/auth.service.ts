import { Injectable } from '@angular/core';

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

export interface AuthData {
  address: any[];
  avatar: string;
  datecreate: number;
  datelogin: number;
  dateupdate: number;
  email: string;
  fullname: string;
  password: any;
  phone: string;
  role: string;
  uid: string;
  username: string;
}

@Injectable()
export class AuthService {
  isAuth:boolean = false;
  data:any;
  message:string = "";
  
  constructor() {
    this.getDataAuth()
  }

  registerAccount(value:AuthData){
    firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then( (succsess) => {
        if(succsess.user){
          value.uid = succsess.user.uid;
          value.password = null;
          firebase.database().ref('users/' + value.uid).set(value);
        }
      })
      .catch( (error) => this.message = error.message );
  }
  
  signIn(value:AuthData){
    firebase.auth().signInWithEmailAndPassword(value.email,value.password)
      .then( (auth) => {
        firebase.database().ref('users/'+auth.user?.uid).update({"datelogin": new Date().getTime()});
        this.message = 'Signin success';
      })
      .catch( (error) => {
        alert(error.message)
        this.message = error.message
      });
  };

  getDataAuth(){
    firebase.auth().onAuthStateChanged( (auth) => {
      if(auth){
        firebase.database().ref('/users').orderByChild("uid").equalTo(auth.uid).on('value', 
          (snapshot) => {
            this.data = snapshot.val()[auth.uid]
            this.isAuth = true;
          },
          (error) => console.log('error')
        );
      }
      //console.log('test', firebase.auth().currentUser?.uid)
      
      // firebase.auth().currentUser?.updateProfile({displayName: "",email:"",photoURL:"",phoneNumber:""})
      //   .then( () => {} )
      //   .catch( (error) => {} );

      // firebase.auth().currentUser?.sendEmailVerification().then( () => {} ).catch( (error) => {} );
    });
  };

  updateDataAuth(value:AuthData){
    value['dateupdate'] = new Date().getTime();
    firebase.database().ref('users/' + value.uid).set(value);
  }

  resetPassword(email:string){
    firebase.auth().sendPasswordResetEmail(email)
      .then( (success) => {
        this.message = 'Reset Password Link has been sent to your email';
      })
      .catch( (error) => this.message = error.message );
  };

  signOut(){
    firebase.auth().signOut()
      .then( () => {
        this.isAuth = false;
        this.data = null;
        this.message = 'SignOut Success';
      })
      .catch( (error) => this.message = error.message);
  };

  getUid(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().onAuthStateChanged( (auth:any) => {
        if(auth){
          resolve(auth.uid);
        } else resolve('')
      })
    });
  }
  
  hideMessage(){
    this.message = ""
  }

}