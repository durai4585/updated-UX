import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from "rxjs/observable/forkJoin";
import { parseString } from 'xml2js';
import * as xml2js from "xml2js";
//import {map}  from 'rxjs/add/operator/map';

@Injectable()
export class LatestStoryService {
    constructor(private _http: HttpClient) { }

    getScreenShots(page: number): Observable<any[]> {
        return forkJoin([

            //-------------------dribbble------------------//
            //this._http.get('https://api.dribbble.com/v1/shots?access_token=0b8f0bbf2352be625a2e69211592aed5003b101d7fc01c40d2928e1e3e39bfe1&page=' + page),

            //-------------------designernews------------------//
            this._http.get<any[]>('https://www.designernews.co/?format=rss', {
                headers: new HttpHeaders()
                    .append('Content-Type', 'application/x-www-form-urlencoded')
                    .append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS')
                    .append('Access-Control-Allow-Origin', '*')
                    .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method")
                ,   responseType: 'text' as 'json'
            }),

            //-------------------producthunt------------------//
            this._http.get<any[]>('https://www.producthunt.com/feed?category=undefined', {
                headers: new HttpHeaders()
                    .append('Content-Type', 'application/x-www-form-urlencoded')
                    .append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS')
                    .append('Access-Control-Allow-Origin', '*')
                    .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method")
                , responseType: 'text' as 'json'
            }),

            //-------------------behance------------------//
            this._http.get<any[]>('https://www.behance.net/v2/projects?sort=published_date&field=132&content=project&api_key=OGWw0DdyHFb4h9zjKIXAFNKvPG1iJRJ6'),


            //-------------------medium------------------//
            //this._http.get<any[]>('https://medium.com/feed/@uxplanet')
            //   or      https://medium.com/feed/topic/digital-design

            //-------------------thenextweb------------------//
            //this._http.get<any[]>('https://thenextweb.com/feed')


            //-------------------pixabay------------------//
            //https://pixabay.com/api/?key=8459865-2d66ad6fa313800389166bfcb
            //https://pixabay.com/api/?key=8459865-2d66ad6fa313800389166bfcb&q=yellow+flowers&image_type=photo


            //Referance:
            //https://usepanda.com/app/#/
            //https://www.prototypr.io/home/
            //https://news.ycombinator.com/news


        ]);
    }
}
