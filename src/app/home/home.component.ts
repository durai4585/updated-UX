import { Component, OnInit } from '@angular/core';
import { UserPostsService } from '../user-posts.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component( {
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
} )

export class HomeComponent {
    userAddForm: FormGroup;

    model: any = {};
    subscribed = '';
    constructor( private userPostsService: UserPostsService,
        private formBuilder: FormBuilder ) { this.buildForm(); };


    buildForm(): void {
        this.userAddForm = this.formBuilder.group( {
            email: ['', [Validators.required, Validators.pattern( /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ )]],

        } );
    }

    subscribe() {
        this.userPostsService.subscribe( this.model.email )
            .then( response => {
                //console.log(response);
                if ( response.result == 'exists' ) { this.subscribed = 'exists' }
                else { this.subscribed = 'added' }
            } )

    }
}
