import { Component, OnInit } from '@angular/core';
import { UserPostsService } from '../user-posts.service';
import {Posts} from '../posts';
import 'rxjs/add/operator/switchMap';
import {Router} from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Location} from "@angular/common";


@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})


  export class UserPostsComponent {
    userAddForm: FormGroup;
    user = new Posts();

    constructor(private userPostsService: UserPostsService,
                private router: Router,
                private location: Location,
                private formBuilder: FormBuilder) {
      this.buildForm();
    };

    buildForm(): void {
      this.userAddForm = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
        url: ['', Validators.required]
      });
    }
    add(): void {
      let user = this.userAddForm.value as Posts;
      user.postedDate=new Date();
        user.isActive='Y';
        user.status='New';
        console.log("user ---> "+user);

      this.userPostsService.add(user)
        .then(response => {
          console.log("response :: "+response);
            alert("Thank you! We'll be in touch shortly.")
          this.router.navigate(['/']);
        })
    }
  }
