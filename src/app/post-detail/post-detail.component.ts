import { Component, OnInit } from '@angular/core';
import { HandPickedService } from '../hand-picked.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { Meta, Title } from '@angular/platform-browser';
import {Posts} from '../posts';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  posts = [];
  pageNumber = 1;
  selectedPostUrl: SafeResourceUrl;
  selectedPostTitle:string;
  selectedPostMetaTitle:string;
  postUrl:string;
hasParamId:boolean;

  constructor(private handPickedService: HandPickedService,private sanitizer: DomSanitizer, private route: ActivatedRoute, private router: Router, private title: Title, private meta: Meta) {

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
     this.selectedPostUrl = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.bestuxdesign.com/");
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
      this.selectedPostTitle=element.title;
      this.selectedPostMetaTitle=element.metatitle;
      this.title.setTitle( this.selectedPostTitle);
    });
    });


      }

  getData() {
      this.handPickedService.getScreenShots(this.pageNumber).subscribe(results => {
          let list = [];
          results[0].forEach(element => {
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
        console.log(post);
         this.selectedPostUrl =   this.sanitizer.bypassSecurityTrustResourceUrl(post.url);
        this.iFrameURL();
        this.handPickedService.add_viewcount(post._id)
          .then(response => {
            //console.log(response);
          })
      }
      iFrameURL() {
   return this.selectedPostUrl;
 }
      likecount(event, post) {
        //console.log(post);
        this.handPickedService.add_likecount(post._id)
          .then(response => {
            //console.log(response);
          })
      }

}
