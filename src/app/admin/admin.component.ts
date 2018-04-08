import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import {Posts} from '../posts';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
  todayposts = [];
  yesterdayposts = [];
  olderdayposts = [];
  pageNumber = 1;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
      this.getData();
  }

  approve(post) {
          this.adminService.approvePost(post)
            .then(response => {
                alert("Posted");
                this.router.navigate(['/admin']);
            })
           }
           delete(post) {
                   this.adminService.deletePost(post)
                     .then(response => {
                         alert("Deleted");
                         this.router.navigate(['/admin']);
                     })
                    }

  getData() {
      this.adminService.getScreenShots(this.pageNumber).subscribe(results => {
var todayDate = new Date();
          results[0].forEach(element => {
             let postDate = new Date(element.postedDate);
              console.log(postDate);
              if(todayDate.setHours(0,0,0,0) === postDate.setHours(0,0,0,0))
              {
                  this.todayposts.push({
                  "_id": element._id,
                  "name": element.name,
                  "url": element.url,
                  "postedDate": element.postedDate
                  });
              }
              else
              {
                  this.yesterdayposts.push({
                  "_id": element._id,
                  "name": element.name,
                  "url": element.url,
                  "postedDate": element.postedDate
                  });
              }
          });


        });
      }

}
