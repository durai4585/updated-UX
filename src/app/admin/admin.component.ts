import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import {Posts} from '../posts';
import {Router} from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

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
   todayDate = new Date();
   yesterdayDate = new Date();
    showDialog = false;
    userAddForm: FormGroup;
    upost = new Posts();

  constructor(private adminService: AdminService,
    private router: Router, private formBuilder: FormBuilder) {this.buildForm(); }

  ngOnInit() {
      this.getData();
  }
  buildForm(): void {
    this.userAddForm = this.formBuilder.group({
      image: [''],
      title: ['', Validators.required],
      website: ['', Validators.required]
    });
  }
  listClick(event, newValue) {
    console.log(newValue);
    this.showDialog = true;
    this.upost = newValue;  // don't forget to update the model here
    // ... do other stuff here ...
}
onFileChange($event) {
     let file = $event.target.files[0]; // <--- File Object for future use.
     this.userAddForm.controls['image'].setValue(file ? file.name : ''); // <-- Set Value for Validation
}

  updatePost(): void {
    let userAddFormvalue = this.userAddForm.value as Posts;
    this.upost.title=userAddFormvalue.title;
      this.upost.website=userAddFormvalue.website;
        this.upost.image=userAddFormvalue.image;
    this.upost.postedDate=new Date();
        this.upost.status='Posted';
      this.upost.isActive='Y';
      //console.log(upost);

  this.adminService.approvePost(this.upost)
      .then(response => {
        //console.log(response);
        //this.router.navigate(['/home']);
        this.showDialog = false;
      })
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

          results[0].forEach(element => {
             let postDate = new Date(element.postedDate);
              console.log(postDate);
              //this.todayposts.date=todayDate.setHours(0,0,0,0);

            this.yesterdayDate =  new Date(this.yesterdayDate.setDate(this.todayDate.getDate() - 1));
              if(this.todayDate.setHours(0,0,0,0) === postDate.setHours(0,0,0,0))
              {
                  this.todayposts.push({
                  "_id": element._id,
                  "name": element.name,
                  "email": element.email,
                  "url": element.url,
                  "title": element.title,
                  "image": element.image,
                  "website": element.website,
                  "status": element.status,
                  "postedDate": element.postedDate
                  });
              }
              else if(this.yesterdayDate.setHours(0,0,0,0) === postDate.setHours(0,0,0,0))
              {
                  this.yesterdayposts.push({
                    "_id": element._id,
                    "name": element.name,
                    "email": element.email,
                    "url": element.url,
                    "title": element.title,
                    "image": element.image,
                    "website": element.website,
                    "status": element.status,
                    "postedDate": element.postedDate
                  });
              }
              else
              {
                  this.olderdayposts.push({
                    "_id": element._id,
                    "name": element.name,
                    "email": element.email,
                    "url": element.url,
                    "title": element.title,
                    "image": element.image,
                    "website": element.website,
                    "status": element.status,
                    "postedDate": element.postedDate
                  });
              }
          });


        });
      }

}
