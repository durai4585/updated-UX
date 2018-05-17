import { Component, OnInit } from '@angular/core';
import { HandPickedService } from '../hand-picked.service';

@Component({
  selector: 'app-hand-picked',
  templateUrl: './hand-picked.component.html',
  styleUrls: ['./hand-picked.component.css']
})
export class HandPickedComponent implements OnInit {
  posts = [];
  pageNumber = 1;
  constructor(private handPickedService: HandPickedService) { }

  ngOnInit() {
      this.getData();
  }

  onScrollDown() {

      this.pageNumber += 1;
      this.getData();
  }


  getData() {
      this.handPickedService.getScreenShots(this.pageNumber).subscribe(results => {
          let list = [];
          results[0].forEach(element => {
              console.log("element.isIframe : "+ element.isIframe);
              let url = element.url
            //if(element.isIframe) {url = "http://localhost:4200//detail/"+element._id}
              list.push({
                  "_id": element._id,
                  "title": element.title,
                  "image": element.image,
                  "url": url,
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
        //console.log("view count : "+ post);
        this.handPickedService.add_viewcount(post._id)
          .then(response => {
            //console.log(response);
          })
      }
      likecount(event, post) {
        //console.log(post);
        this.handPickedService.add_likecount(post._id)
          .then(response => {
            //console.log(response);
          })
      }
}
