import { Component, OnInit } from '@angular/core';
import { UserPostsService } from '../user-posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

  export class HomeComponent {
    model: any = {};
    subscribed='';
    constructor(private userPostsService: UserPostsService) { };

    subscribe() {
        this.userPostsService.subscribe(this.model.email)
          .then(response => {
            //console.log(response);
            if(response.result=='exists'){this.subscribed='exists'}
            else{this.subscribed='added'}
          })

    }
  }
