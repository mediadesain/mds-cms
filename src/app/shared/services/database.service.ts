import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/database';
import { GetDataInterface, WriteDataInterface } from 'src/app/shared/interfaces/database.interface';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  data: any;
  constructor(){
    // ----- DATA STREAMING -----
    // firebase.database().ref('/product').on(
    //   'value', (snapshoot) => {
    //     this.data = Object.values(snapshoot.val())
    //     console.log('data stream',this.data)
    //   }
    // )
  }

  async getDatabase(parameter: GetDataInterface){
    const eventref = !parameter.query ? firebase.database().ref(parameter.url) : firebase.database().ref(parameter.url).orderByChild(parameter.key).equalTo(parameter.value);
    const snapshot = await eventref.once('value');

    if (parameter.isArray){
      // List Data
      let Array: any = snapshot.toJSON();
      Array = Array == null ? [] : Object.values(Array)
      return Array;
    } else {
      // Detail Data
      let Obj: any = snapshot.toJSON();
      Obj = !parameter.query ? Obj : Object.values(Obj)[0]
      return Obj
    }
  }


  writeDatabase(parameter: WriteDataInterface){
    console.log(parameter);

    if (parameter.type === 'set'){
      console.log('set data');
      firebase.database().ref(parameter.url).set(parameter.value,
        (error) => {
          if (error) { console.log(error); }
          else { parameter.isShowAlert && this.alertSuccess(); }
        }
      );
    }
    if (parameter.type === 'update'){
      console.log('update data');
      firebase.database().ref(parameter.url).update(parameter.value,
        (error) => {
          if (error) { console.log(error); }
          else { parameter.isShowAlert && this.alertSuccess(); }
        }
      );
    }
  }

  alertSuccess(){
    alert('Data Sucessfully Updated');
  }

}
