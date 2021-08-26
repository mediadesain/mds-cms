import { Injectable } from '@angular/core';
import { randomKarakter } from '../helper/mds-helper.component';
import { DatabaseService } from './database.service';

import firebase from "firebase/app";
import "firebase/storage";

@Injectable()
export class StorageService {
    status:number[]=[];
    isLoading:boolean = false;
    constructor(private _database: DatabaseService) {}

    fileUrl(path:string){
        return new Promise( (resolve, reject)=> {
            firebase.storage().ref(path).getDownloadURL().then( url => {
                resolve(url)
            })
        } )
    };
    
    uploadFile(detailupload:any){
        this.isLoading = true;
        //Files
        var target = detailupload.files.target as HTMLInputElement;
        var files = target.files as FileList;
        var exsistfile:any = Object.values(detailupload.databasecheck);

        const promises = [];
        for (let i = 0; i < files.length; i++) {
            //Storage
            const uploadTask = firebase.storage().ref().child(detailupload.folderpath+'/' + files[i].name).put(files[i])
            promises.push(uploadTask);
            uploadTask.on('state_changed',
                (snapshot:any) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    //console.log('file', i, progress);
                    this.status[i] = parseInt(progress.toFixed(0));
                    if(this.status[i] >= 100){
                        //Database
                        var filedatabase:any = {}
                        var checkfileid = exsistfile.map((x:any)=>x.filename).indexOf(files[i].name)
                        if(checkfileid >= 0) filedatabase['fileid'] = exsistfile[checkfileid].fileid
                        else filedatabase['fileid'] = randomKarakter(20)
                        filedatabase['filename'] = files[i].name
                        this._database.writeDatabase({
                            url: detailupload.databasepath+'/'+filedatabase.fileid,
                            value: filedatabase,
                            type: 'put',
                            isShowAlert: false
                        })
                    }
                },
                (error:any) => {
                    console.log(error)
                    alert('Account Not allow to write file');
                },
                () => {
                    //console.log('complete')
                    // uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                    //     console.log(downloadURL);
                    // });
                }
            );
        }
        Promise.all(promises).then(tasks => {
            alert('all uploads complete');
            setTimeout(()=>{
                this.status = []
                this.isLoading = false;
            }, 1000)
        });
    };


}