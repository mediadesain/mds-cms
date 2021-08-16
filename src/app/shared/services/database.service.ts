import { Injectable } from '@angular/core';
import firebase from "firebase/app";
import "firebase/database";

interface WriteDataInterface {
  url: string,
  isShowAlert: boolean,
  type: string, // set, update
  value: any
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  data:any;
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
    if(Array==null)
      Array = []
    return Array
  }


  writeDatabase(parameter:WriteDataInterface){
    console.log(parameter)

    if(parameter.type === 'set'){
      console.log('set data')
      firebase.database().ref(parameter.url).set(parameter.value,
        (error) => {
          if (error) console.log(error)
          else parameter.isShowAlert && this.alertSuccess()
        }
      );
    }
    if(parameter.type === 'update'){
      console.log('update data')
      firebase.database().ref(parameter.url).update(parameter.value,
        (error) => {
          if (error) console.log(error)
          else parameter.isShowAlert && this.alertSuccess()
        }
      );
    }
  }

  alertSuccess(){
    alert('Data Sucessfully Updated')
  }

}