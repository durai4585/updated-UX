import { Component, OnInit } from '@angular/core';
import { HandPickedService } from '../hand-picked.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { Meta, Title } from '@angular/platform-browser';
import {Posts} from '../posts';
import {Location} from '@angular/common';
import { HOST } from "../constant";

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  posts = [];
  pageNumber = 1;
  selectedPostUrl: SafeResourceUrl;
  postUrl:string;
  hasParamId:boolean;

  constructor(private _location: Location, private handPickedService: HandPickedService,private sanitizer: DomSanitizer, private route: ActivatedRoute, private router: Router, private title: Title, private meta: Meta) {

    }

  ngOnInit() {
      this.getData();
      var paramId: string;
        var postUrl: string;

  this.route.params.subscribe((params) => paramId = params['id']);

 this.hasParamId = paramId != undefined;

 if (this.hasParamId) {
    this.getPostById(paramId);
 }else
 {
     this.selectedPostUrl = this.sanitizer.bypassSecurityTrustResourceUrl(HOST+"/");
 }
  }

  onScrollDown() {

      this.pageNumber += 1;
      this.getData();
  }

  getPostById(_id) {

    this.handPickedService.getPostById(_id).subscribe(results => {
        results[0].forEach(element => {

    this.selectedPostUrl=  this.sanitizer.bypassSecurityTrustResourceUrl(element.url);
    this.updateMetaData(element);
    });
    });
  }

  getData() {
      this.handPickedService.getScreenShots(this.pageNumber).subscribe(results => {
          let list = [];
          results[0].filter((post) => post.isIframe == true).forEach(element => {
              //console.log("element.url : "+ element.url);
              list.push({
                  "_id": element._id,
                  "title": element.title,
                  "image": element.image,
                  "url": element.url,
                  "source": element.website,
                  "viewcount": element.viewcount,
                  "likecount": element.likecount
              });
          });
          list.forEach(element => {
              this.posts.push(element);
          });

        });
      }

      viewcount(event, post) {
         this.selectedPostUrl =   this.sanitizer.bypassSecurityTrustResourceUrl(post.url);
        this.iFrameURL();
        this.updateMetaData(post);
        this.handPickedService.add_viewcount(post._id)
          .then(response => {
            //console.log(response);
          })
      }
      iFrameURL() {
   return this.selectedPostUrl;
 }
      likecount(event, post) {
        this.handPickedService.add_likecount(post._id)
          .then(response => {
          })
      }

      updateMetaData(element){
        this._location.replaceState('/detail/'+element._id);
        this.title.setTitle( element.title);

         //<!-- Schema.org markup for Google+ -->
         this.meta.updateTag({ itempropitemprop: 'name', content: element.title });
         this.meta.updateTag({ itemprop: 'image', content: element.image });
          // <!-- Twitter Card data -->
        this.meta.updateTag({ name: 'twitter:title', content: element.title });
        this.meta.updateTag({ name: 'twitter:image', content: element.image });
        // Open Graph data
          this.meta.updateTag({ property: 'og:title', content: element.title });
          this.meta.updateTag({ property: 'og:type', content: 'article' });
          this.meta.updateTag({ property: 'og:url', content: HOST+'/detail/'+element._id });
          this.meta.updateTag({ property: 'og:image', content: element.image });
      }

}
