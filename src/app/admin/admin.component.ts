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
    private router: Router, private formBuilder: FormBuilder) {

      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if(!currentUser){
      this.router.navigate(['/login']);
    }
        this.buildForm();
    }

  ngOnInit() {
      this.getData();
  }
  buildForm(): void {
    this.userAddForm = this.formBuilder.group({
      image: [''],
      title: [''],
      website: ['']
    });
  }
  listClick(event, newValue) {
    //console.log(newValue);
    this.showDialog = true;
    this.upost = newValue;
      this.userAddForm.controls['title'].setValue(newValue.title);
      this.userAddForm.controls['website'].setValue(newValue.website);
      this.userAddForm.controls['image'].setValue(newValue.image);
    // ... do other stuff here ...
}
onFileChange(event) {
     let reader = new FileReader();
         if(event.target.files.length > 0) {
           let file = event.target.files[0];
           reader.readAsDataURL(file);
           reader.onload = () => {
            this.userAddForm.controls['image'].setValue({
               filename: file.name,
               filetype: file.type,
               value: reader.result.split(',')[1]
             })
           };
         }
}

  updatePost(): void {
    let userAddFormvalue = this.userAddForm.value as Posts;
    this.upost.title=userAddFormvalue.title;
      this.upost.website=userAddFormvalue.website;
        this.upost.image=userAddFormvalue.image;
    this.upost.postedDate=new Date();
        this.upost.status='posted';
      //console.log(this.upost);
        
        this.upost.isApproved ='Y';
        this.upost.isActive ='Y';

  this.adminService.approvePost(this.upost)
      .then(response => {
        //console.log(response);
        //this.router.navigate(['/home']);
        this.showDialog = false;
      })
  }

           removePost(post) {
             post.status="removed"
                 post.isActive ='N';
                   this.adminService.deletePost(post)
                     .then(response => {
                           this.showDialog = false;
                     })
                    }

  getData() {
      this.adminService.getScreenShots(this.pageNumber).subscribe(results => {

          results[0].forEach(element => {
             let postDate = new Date(element.postedDate);
              console.log(element);
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
