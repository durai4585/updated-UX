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

  getData() {
      this.handPickedService.getScreenShots(this.pageNumber).subscribe(results => {
          let list = [];
          results[0].forEach(element => {
              list.push({
                  "title": element.title,
                  "image": element.image,
                  "url": element.url,
                  "source": "dribbble"
              });
          });
          list.forEach(element => {
              this.posts.push(element);
          });

        });
      }
}
