
import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from "rxjs/observable/forkJoin";

import { LatestStoryService } from "../latest-story.service";
import { parseString } from 'xml2js';

@Component( {
    selector: 'app-latest-story',
    templateUrl: './latest-story.component.html',
    styleUrls: ['./latest-story.component.css']
} )
export class LatestStoryComponent implements OnInit {

    posts = [];
    pageNumber = 1;
    constructor( private http: HttpClient, private latestStoryService: LatestStoryService ) { }

    ngOnInit() {
        this.getData();
    }
    onScrollDown() {
       
        this.pageNumber += 1;
        this.getData();
    }


    predicateBy( prop ) {
        return function( a, b ) {
            if ( a[prop] > b[prop] ) {
                return 1;
            } else if ( a[prop] < b[prop] ) {
                return -1;
            }
            return 0;
        }
    }

    getData() {
        this.latestStoryService.getScreenShots( this.pageNumber ).subscribe( results => {
            let list = [];

            // console.log("RSS :: "+results[0]);

            let temp = [];

            //console.log("Feed :"+ results[0] );

            temp = JSON.parse( results[0] );

            temp.forEach( element => {

                if ( typeof element.image != 'undefined' && element.image ) {
                    //console.log( element );
                    list.push( {
                        "title": element.title,
                        "url": element.link,
                        "source": element.host,
                        "image": element.image
                    } );
                }
            } );

            list.forEach( element => {

                this.posts.push( element );
            } );
            //this.posts.sort( this.predicateBy( 'title' ) );

            console.log( this.pageNumber );
        } );
    }


}
