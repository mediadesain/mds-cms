import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DatabaseService } from 'src/app/shared/services/database.service';
import { StorageService } from 'src/app/shared/services/storage.service';

import { jumblahKan, youtubeEmbed } from 'src/app/shared/helper/mds-helper.component';

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
    public auth: AuthService,
    private dbservice: DatabaseService,
    public strgstservice: StorageService
  ) {}
  
  ngOnInit(): void {
    console.log("Auth",this.auth)

    var url = this.route.snapshot.paramMap.get("url")
    var reference = { url: '/product', query: true, key: 'url', value: url }
    this.dbservice.getDatabase(reference).then(
      (val) => {
        var ArrModified = Object.values(val)
        ArrModified.forEach((a:any) => {
          //Parse Media Files
          if(!a.mediafiles)
            a.mediafiles = {};
          
          var mediafiles_array = Object.values(a.mediafiles.photos);
          mediafiles_array.forEach( (b:any) => {
            this.strgstservice.fileUrl('/products/'+a.sku+'/'+b.filename).then( url => {
              a.mediafiles.photos[b.fileid]._fileurl = url
            })
          } )
          a.mediafiles.videos = a.mediafiles.videos ? youtubeEmbed(a.mediafiles.videos) : null;
          
          //Parse Main Thumbnail
          if(!a.thumbnail){
            a.thumbnail = {};
          }
          a.thumbnail.photos = mediafiles_array;

          //Parse Variant
          a._variant = Object.values(a.variant);
          a._variant.forEach( (b:any)=> {
            if(b.photos)
              b.photos = JSON.parse(b.photos) 
          });
          a._totalstock = a._variant.map( (b:any)=>b.stock ).reduce(jumblahKan);
        });
        this.data = ArrModified[0];
        console.log("Data",this.data)
      }
    )
    console.log("Storage Service", this.strgstservice)
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
    this.strgstservice.uploadFile({
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
    console.log('Src Data',data)
    var obj = {};
    var i;
    for (i = 0; i < data._variant.length; i++) {
      var newkey:any = {};
      newkey[data._variant[i].sku] = data._variant[i];
      Object.assign(obj, newkey)
    }
    data['variant'] = obj;
    console.log('Final Data',data)
  };
  
    
  
}
