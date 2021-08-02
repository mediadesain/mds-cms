import { Injectable } from '@angular/core';
import firebase from "firebase/app";
import "firebase/database";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  data:any
  constructor(){
    // ----- DATA STREAMING -----
    // firebase.database().ref('/product').on(
    //   'value', (snapshoot) => {
    //     this.data = Object.values(snapshoot.val())
    //     console.log('data stream',this.data)
    //   }
    // ) 
  }

  async getDatabase(parameter:any){
    var eventref = !parameter.query ? firebase.database().ref(parameter.url) : firebase.database().ref(parameter.url).orderByChild(parameter.key).equalTo(parameter.value)
    var snapshot = await eventref.once('value');
    var Array : any = snapshot.toJSON()
    if(Array==null) window.location.href = '/404'
    return Array
  }

  writeDatabase(parameter:any){
    console.log(parameter)
    firebase.database().ref(parameter.databasepath).set(parameter.value,
      (error) => {
          if (error) console.log(error)
          else alert('file Uploaded')
      }
  );
  }

}