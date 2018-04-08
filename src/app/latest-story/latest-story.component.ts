
import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from "rxjs/observable/forkJoin";

import { LatestStoryService } from "../latest-story.service";
import { parseString } from 'xml2js';

@Component({
    selector: 'app-latest-story',
    templateUrl: './latest-story.component.html',
    styleUrls: ['./latest-story.component.css']
})
export class LatestStoryComponent implements OnInit {

    posts = [];
    pageNumber = 1;
    constructor(private http: HttpClient, private latestStoryService: LatestStoryService) { }

    ngOnInit() {
        this.getData();
    }
    onScrollDown() {
        this.pageNumber += 1;
        this.getData();
    }


    predicateBy(prop) {
        return function(a, b) {
            if (a[prop] > b[prop]) {
                return 1;
            } else if (a[prop] < b[prop]) {
                return -1;
            }
            return 0;
        }
    }

    getData() {
        this.latestStoryService.getScreenShots(this.pageNumber).subscribe(results => {
            let list = [];

            //----------------------dribbble------------------------------//

            results[0].forEach(element => {
                list.push({
                    "title": element.title,
                    "image": element.images.normal,
                    "url": element.html_url,
                    "views_count": element.views_count,
                    "source": "dribbble"
                });
            });

            //----------------------designernews------------------------------//

            parseString(results[0], function(err, result) {
                //console.log(result.rss.channel[0].item);
                result.forEach(element => {
                    list.push({
                        "title": element.title,
                        "url": element.link,
                    });
                    //console.log(element.title[0]);
                });
            });

            //----------------------producthunt------------------------------//

            parseString(results[2], function(err, result) {
                 console.log(result);
                result.feed.entry.forEach(element => {
                    list.push({
                        "title": element.title,
                        "url": element.link,
                        "source": "producthunt",
                        "image": 'assets/images/ph.png',
                    });
                    //console.log(element.title[0]);
                });
            });

            //----------------------behance------------------------------//

            results[3].projects.forEach(element => {
                //console.log("element : " + element.name);
                list.push({
                    "title": element.name,
                    "image": element.covers.original,
                    "url": element.url,
                    "source": "behance"
                });
            });


            //----------------------medium------------------------------//
            //console.log(results[4]);

            //let JSON_HIJACKING_PREFIX = '])}while(1);</x>';

            //console.log(JSON.parse(results[4].replace(JSON_HIJACKING_PREFIX, '')));

            //----------------------thenextweb------------------------------//
            // console.log(results[5]);

            list.forEach(element => {

                this.posts.push(element);
            });
            this.posts.sort(this.predicateBy('title'));



            console.log(this.pageNumber);
        });
    }


}
