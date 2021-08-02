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
    public auth: AuthService,
    private dbservice: DatabaseService,
    public strgstservice: StorageService
  ) { }

  ngOnInit() {
    console.log("Auth", this.auth)

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
          
          //Parse Variant
          a._variant = Object.values(a.variant);
          a._variant.forEach( (b:any)=> {
            if(b.photos)
              b.photos = JSON.parse(b.photos) 
          });

          //Parse Main Thumbnail
          if(!a.thumbnail)
            a.thumbnail = {};
          
          a.thumbnail.photos = mediafiles_array;
          var mainfilenamem = a._variant[this.selected].photos[0]
          a.thumbnailmain = a.thumbnail.photos.filter( (x:any) =>x.filename == mainfilenamem)[0];

          a._totalstock = a._variant.map( (b:any)=>b.stock ).reduce(jumblahKan);
        });
        this.data = ArrModified[0];
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
