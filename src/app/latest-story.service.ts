import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from "rxjs/observable/forkJoin";


@Injectable()
export class LatestStoryService {
    constructor( private _http: HttpClient ) { }

    getScreenShots( page: number ): Observable<any[]> {
        return forkJoin( [

            this._http.get<any[]>( 'https://www.bestuxdesign.com/api/design/page/' + page )

        ] );
    }
}
