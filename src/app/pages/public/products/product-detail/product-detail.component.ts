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
  selected : any = 0;

  constructor(
    private route: ActivatedRoute,
    public _auth: AuthService,
    private _database: DatabaseService,
    public _storage: StorageService
  ) { }

  ngOnInit() {
    console.log("Auth", this._auth)

    var url = this.route.snapshot.paramMap.get("url")
    var reference = { url: '/product', query: true, key: 'url', value: url }
    this._database.getDatabase(reference).then(
      (val) => {
        var ArrModified:any = Object.values(val)[0]
        //Parse Media Files
        if(!ArrModified['mediafiles'])
          ArrModified['mediafiles'] = {};
        var mediafiles_array = Object.values(ArrModified['mediafiles'].photos);
        mediafiles_array.forEach( (b:any) => {
          this._storage.fileUrl('/products/'+ArrModified.sku+'/'+b.filename).then( url => {
            ArrModified['mediafiles'].photos[b.fileid]._fileurl = url
          })
        })
        ArrModified['mediafiles'].videos = ArrModified['mediafiles'].videos ? youtubeEmbed(ArrModified['mediafiles'].videos) : null;
        
        //Parse Variant
        ArrModified['_variant'] = Object.values(ArrModified['variant']);
        ArrModified['_variant'].forEach( (b:any)=> {
          if(b['photos']) b['photos'] = JSON.parse(b.photos) 
        });

        //Parse Main Thumbnail
        if(!ArrModified['thumbnail'])
          ArrModified['thumbnail'] = {};
        ArrModified['thumbnail'].photos = mediafiles_array;
        var mainfilename = ArrModified['_variant'][this.selected].photos[0]
        ArrModified['thumbnailmain'] = ArrModified.thumbnail.photos.filter( (x:any) =>x.filename == mainfilename)[0];
        ArrModified['_totalstock'] = jumblahKan(ArrModified['_variant'].map( (b:any)=>b.stock ));
        
        this.data = ArrModified;
        console.log("Data",this.data)
      }
    )
    
  };

  updateMainThumb(target:any, value:string){
    target.thumbnailmain = value
  };

  resetMainThumb(target:any, value:any){
    var newdata:any = [];
    target.thumbnail.photos.map((a:any) => {
      if(!a.filename.indexOf(value.photos[0]))
      newdata.push(a)
    })
    target.thumbnailmain = newdata[0]
  }
}
