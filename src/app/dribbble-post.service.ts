import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from "rxjs/observable/forkJoin";
import {Posts} from './posts';

@Injectable()
export class DribbblePostService {
    private host = window.location.hostname;
    private headers = new HttpHeaders({'Content-Type': 'application/json'});
    private usersURL = 'https://www.buxd.io/user/shots/add';
    constructor( private _http: HttpClient ) { }
    
    getScreenShots(page: number): Observable<any[]> {
        return this._http.get<any[]>('https://www.buxd.io/user/shots/page/'+ page);
      }
    
    add(user: Posts): Promise<Posts>{
        return this._http.post(this.usersURL, user, {headers: this.headers})
          .toPromise()
          .then(response => response)
          .catch(this.handleError)
      }
    
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
      }
    
}
