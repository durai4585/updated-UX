import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from "rxjs/observable/forkJoin";

import { DribbblePostService } from "../dribbble-post.service";
import { parseString } from 'xml2js';


@Component({
  selector: 'app-dribbble-post',
  templateUrl: './dribbble-post.component.html',
  styleUrls: ['./dribbble-post.component.css']
})
export class DribbblePostComponent implements OnInit {

    posts = [];
    pageNumber = 1;
    constructor( private http: HttpClient, private dribbblePostService: DribbblePostService ) { }

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
        this.dribbblePostService.getScreenShots( this.pageNumber ).subscribe( results => {
            let list = [];

             //console.log("USER-Post-Latest :: "+results);
             
             var myJsonString = JSON.stringify(results);
             console.log("myJsonString1 :: "+myJsonString);
         
            let temp = [];

            //console.log("Feed :"+ results[0] );

            temp = JSON.parse( myJsonString);
            //console.log( "Temp :: "+temp );
            temp.forEach( element => {
                console.log("check.."+ element );
                //if ( typeof element.image != 'undefined' ) {
                    console.log("test1 "+ element.title );
                    list.push( {
                        "title": element.title,
                        "url": element.link,
                        "source": element.host,
                        "image": element.image
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
