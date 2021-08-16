import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DatabaseService } from 'src/app/shared/services/database.service';
import { StorageService } from 'src/app/shared/services/storage.service';

import { jumblahKan, listObject, youtubeEmbed } from 'src/app/shared/helper/mds-helper.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {
  
  data : any;
  selection : any = [];
  pop : boolean = false;
  
  constructor(
    private route: ActivatedRoute,
    public _auth: AuthService,
    private _database: DatabaseService,
    public _storage: StorageService
  ) {}
  
  ngOnInit(): void {
    var url = this.route.snapshot.paramMap.get("url")
    var reference = { url: '/product', query: true, key: 'url', value: url }
    this._database.getDatabase(reference).then(
      (val) => {
        var ArrModified = Object.values(val)
        ArrModified.forEach((a:any) => {
          //Parse Media Files
          if(!a.mediafiles)
            a.mediafiles = {};
          
          var mediafiles_array = Object.values(a.mediafiles.photos);
          mediafiles_array.forEach( (b:any) => {
            this._storage.fileUrl('/products/'+a.sku+'/'+b.filename).then( url => {
              a.mediafiles.photos[b.fileid]._fileurl = url
            })
          } )
          a.mediafiles.videos = a.mediafiles.videos ? youtubeEmbed(a.mediafiles.videos) : null;
          
          //Parse Main Thumbnail
          if(!a._thumbnail)
            a._thumbnail = {};
          a._thumbnail.photos = mediafiles_array;

          //Parse Variant
          a._variant = Object.values(a.variant);
          a._variant.forEach( (b:any)=> {
            if(b.photos)
              b._photos = JSON.parse(b.photos) 
          });
          a._totalstock = jumblahKan(a._variant.map( (b:any)=>b.stock ));
        });
        this.data = ArrModified[0];
        console.log("Data",this.data)
      }
    )
    console.group('Product Detail Page - Admin')
      console.log("Auth",this._auth)
      console.log("Database Service",this._database);
      console.log("Data List",this.data)
      console.log("Storage Service",this._storage);
    console.groupEnd()
  };

  addVariant(variant:any){
    console.log('var');
    var newdata:any = {
      photos: [],
      price: '',
      sku: '',
      stock: '',
      type: ''
    }
    variant.push(newdata)
  }

  checkFileExist(selection: any, x: any) {
    return selection.map((a: any) => a).indexOf(x.filename);
  };

  updateCheckbox(selection: any, x: any) {
    var idx = selection.map((a: any) => a).indexOf(x.filename);
    if (idx != -1) selection.splice(idx, 1);
    else selection.push(x.filename);
  };


  uploader(e:any, folderpath:string, databasepath:string, checkingfile:any){
    console.log(checkingfile)
    this._storage.uploadFile({
      "files" : e,
      "folderpath" : folderpath,
      "databasepath" : databasepath,
      "databasecheck" : checkingfile
    })
  };
  
  delete(val:string){
    console.log(val)
  }

  updateData(data:any){
    var datafinal = {...data}
    datafinal['variant'] = listObject(datafinal._variant, 'sku');
    datafinal['dateupdate'] = new Date().getTime()
    delete datafinal['_variant']
    delete datafinal['_thumbnail']
    console.log('Source => Final Data',data,'=>', datafinal)

    this._database.writeDatabase({
      isShowAlert: true,
      url: '/product/'+datafinal.sku,
      type: 'update',
      value : datafinal
    })
  };
  
    
  
}
