import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DatabaseService } from 'src/app/shared/services/database.service';
import { StorageService } from 'src/app/shared/services/storage.service';

import { jumblahKan, youtubeEmbed } from 'src/app/shared/helper/mds-helper.component';
import { GetDataInterface } from 'src/app/shared/interfaces/database.interface';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {
  
  data : any;
  selected : any = 0;

  constructor(
    private route: ActivatedRoute,
    public _auth: AuthService,
    private databaseSrvc: DatabaseService,
    public storageSrvc: StorageService
  ) { }

  ngOnInit() {
    console.log("Auth", this._auth)

    var url = this.route.snapshot.paramMap.get("url")
    var reference: GetDataInterface = { isArray: false, url: '/v2/products', query: true, key: 'url', value: url }
    this.databaseSrvc.getDatabase(reference).then(
      (val) => {
        var ArrModified:any = val
        //Parse Media Files
        if(!ArrModified['mediafiles'])
          ArrModified['mediafiles'] = {};
        
        //Parse Variant
        ArrModified['_variant'] = Object.values(ArrModified['variant']);
        ArrModified['_variant'].forEach( (b:any)=> {
          if(b['photos']) b['photos'] = JSON.parse(b.photos) 
        });

        //Parse Main Thumbnail & Video
        if(!ArrModified['_thumbnail'])
          ArrModified['_thumbnail'] = {};
        

        ArrModified['_thumbnail'].photos = Object.values(ArrModified['mediafiles'].photos);
        ArrModified['_thumbnail'].photos.forEach( (b:any,i:number) => {
          this.storageSrvc.fileUrl('/products/'+ArrModified.sku+'/'+b.filename).then( url => {
            ArrModified['_thumbnail'].photos[i].fileurl = url
          })
        })
        var mainfilename = ArrModified['_variant'][this.selected].photos[0];
        ArrModified['_thumbnail'].selected = ArrModified._thumbnail.photos.filter( (x:any) =>x.filename == mainfilename)[0];
        ArrModified['_thumbnail'].video = ArrModified['mediafiles'].videos ? youtubeEmbed(ArrModified['mediafiles'].videos) : null;
        ArrModified['_totalstock'] = jumblahKan(ArrModified['_variant'].map( (b:any)=>b.stock ));
        
        this.data = ArrModified;
        console.log("Data",this.data)
      }
    )
    
  };

  updateMainThumb(target:any, value:string){
    target['_thumbnail'].selected  = value
  };

  resetMainThumb(target:any, value:any){
    var newdata:any = [];
    target['_thumbnail'].photos.map((a:any) => {
      if(!a.filename.indexOf(value.photos[0]))
      newdata.push(a)
    })
    target['_thumbnail'].selected = newdata[0]
  }
}
