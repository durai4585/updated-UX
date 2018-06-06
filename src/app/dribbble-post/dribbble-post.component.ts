import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from "rxjs/observable/forkJoin";

import { DribbblePostService } from "../dribbble-post.service";
import { parseString } from 'xml2js';

import { Posts } from '../posts';
import 'rxjs/add/operator/switchMap';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from "@angular/common";

@Component( {
    selector: 'app-dribbble-post',
    templateUrl: './dribbble-post.component.html',
    styleUrls: ['./dribbble-post.component.css']
} )
export class DribbblePostComponent implements OnInit {

    userAddForm: FormGroup;
    user = new Posts();
    posts = [];
    pageNumber = 1;
    subscribed = '';
    
    constructor( private http: HttpClient, private dribbblePostService: DribbblePostService,
        private router: Router,
        private location: Location,
        private formBuilder: FormBuilder ) {
        this.buildForm();
    };
    
    ngOnInit() {
        this.getData();
    }

    onScrollDown() {

        this.pageNumber += 1;
        this.getData();
    }


    buildForm(): void {
        this.userAddForm = this.formBuilder.group( {
            url: ['', Validators.required]
        } );
    }
    add(): void {
        let user = this.userAddForm.value as Posts;
        user.postedDate = new Date();
        user.isActive = 'Y';
        console.log( user );
        
        console.log("user.url : "+ user.url);
        if(user.url == null || user.url =='' || user.url =='undefined'){
            console.log("invalid....");
            this.subscribed = 'invalid';
            this.router.navigate( ['/'] );
        }else{
        this.dribbblePostService.add( user )
            .then( response => {
                 console.log(response);
                //alert( "Thank you! We'll be in touch shortly." )
                if ( response.status == 'exists' ) { this.subscribed = 'exists' }
                else { this.subscribed = 'added' }
                this.router.navigate( ['/'] );
            } )
        }
            
    }




    getData() {
        this.dribbblePostService.getScreenShots( this.pageNumber ).subscribe( results => {
            let list = [];

            //console.log("USER-Post-Latest :: "+results);
            //console.log("Feed :"+ results[0] );
            //var myJsonString = JSON.stringify( results );
            //console.log( "myJsonString1 :: " + myJsonString );

            let temp = [];

            

            //temp = JSON.parse( myJsonString );
            //console.log( "Temp :: "+temp );
            results.forEach( element => {
                console.log( "check.." + element );
                var parseTemp = JSON.parse( element );
               
                list.push( {
                    "title": parseTemp.title,
                    "url": parseTemp.link,
                    "source": parseTemp.host,
                    "image": parseTemp.image
                } );
                // }
            } );

            list.forEach( element => {

                this.posts.push( element );
            } );
            //this.posts.sort( this.predicateBy( 'title' ) );

            console.log( this.pageNumber );
        } );
    }


}
