import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DatabaseService } from 'src/app/shared/services/database.service';
import { StorageService } from 'src/app/shared/services/storage.service';

import { jumblahKan, listObject, youtubeEmbed } from 'src/app/shared/helper/mds-helper.component';
import { GetDataInterface } from 'src/app/shared/interfaces/database.interface';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {
  
  data : any;
  selection : any = [];
  pop : boolean = false;
  popvariant : boolean = false;
  
  constructor(
    private route: ActivatedRoute,
    public _auth: AuthService,
    private _database: DatabaseService,
    public _storage: StorageService
  ) {}
  
  ngOnInit(): void {
    var url = this.route.snapshot.paramMap.get("url")
    var reference: GetDataInterface = { isArray: false, url: '/v2/products', query: true, key: 'url', value: url }
    this._database.getDatabase(reference).then(
      (val) => {
        var ArrModified:any = val

        //Parse Media Files
        if(!ArrModified.mediafiles)
          ArrModified.mediafiles = {};

        //Parse Variant
        ArrModified._variant = Object.values(ArrModified.variant);
        ArrModified._variant.forEach( (b:any)=> {
          if(b.photos)
            b._photos = JSON.parse(b.photos) 
        });

        //Parse Main Thumbnail
        if(!ArrModified._thumbnail)
          ArrModified._thumbnail = {};

        ArrModified._thumbnail.photos = Object.values(ArrModified.mediafiles.photos);
        ArrModified._thumbnail.photos.forEach( (b:any) => {
          this._storage.fileUrl('/products/'+ArrModified.sku+'/'+b.filename).then( url => {
            ArrModified.mediafiles.photos[b.fileid].fileurl = url
          })
        })
        ArrModified._thumbnail.video = ArrModified.mediafiles.videos ? youtubeEmbed(ArrModified.mediafiles.videos) : null;
        
        ArrModified._totalstock = jumblahKan(ArrModified._variant.map( (b:any)=>b.stock ));
        this.data = ArrModified;
        console.log("Data",this.data)
      }
    )
    console.group('Product Detail Page - Admin')
      console.log("Auth",this._auth)
      console.log("Database Service",this._database);
      console.log("Storage Service",this._storage);
    console.groupEnd()
  };

  addVariant(variant:any, newdata:any){
    console.log(variant, newdata)
    newdata['_photos'] = []
    variant.push(newdata)
  };
  removeVariant(){
    console.log('variant delete')
  };

  checkFileExist(selection: any, x: any) {
    return selection.map((a: any) => a).indexOf(x.filename);
  };

  updateCheckbox(selection: any, x: any) {
    var idx = selection.map((a: any) => a).indexOf(x.filename);
    if (idx != -1) selection.splice(idx, 1);
    else selection.push(x.filename);
  };


  fileUpload(e:any, folderpath:string, databasepath:string, checkingfile:any){
    console.log(checkingfile)
    this._storage.uploadFile({
      "files" : e,
      "folderpath" : folderpath,
      "databasepath" : databasepath,
      "databasecheck" : checkingfile
    })
  };
  fileDelete(val:string){
    console.log(val)
  };

  async updateData(data:any){
    var datafinal = {...data}
    datafinal._variant.forEach( (val:any,i:number) => {
      val.photos = JSON.stringify(val._photos)
      if(i===datafinal._variant.length)
        delete val._photos
    });
    datafinal['variant'] = listObject(datafinal._variant, 'sku');
    datafinal['dateupdate'] = new Date().getTime()
    delete datafinal['_variant']
    delete datafinal['_thumbnail']

    this._database.writeDatabase({
      isShowAlert: true,
      url: '/v2/products/'+datafinal.sku,
      type: 'update',
      value : datafinal
    })
    // console.log('Source =>', data, 'Final Data =>', datafinal)
  };
  
    
  
}
