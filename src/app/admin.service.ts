import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from "rxjs/observable/forkJoin";
import 'rxjs/add/operator/map';
import {Posts} from './posts';

@Injectable()
export class AdminService {
private headers = new HttpHeaders({'Content-Type': 'application/json'});

constructor(private _http: HttpClient) { }

  getScreenShots(page: number): Observable<any[]> {
    return forkJoin([
    //this._http.get('https://www.buxd.io/posts')
     this._http.get('https://www.buxd.io/handpick/post/getbypage/'+ page)
    ]);
  }

  approvePost(posts: Posts): Promise<Posts>{
    //console.log(posts);
    return this._http.put('https://www.buxd.io/handpick/post/approve', posts, {headers: this.headers})
      .toPromise()
      .then(response => response)
      .catch(this.handleError)
  }
  
  deletePost(posts: Posts): Promise<Posts>{
    return this._http.put('https://www.buxd.io/handpick/post/delete', posts, {headers: this.headers})
      .toPromise()
      .then(response => response)
      .catch(this.handleError)
  }
  
  
  getsubscribe(){
      return this._http.get('https://www.buxd.io/subscribe/get', {headers: this.headers})
        .toPromise()
        .then(response => response)
        .catch(this.handleError)
    }

  
  /**
     * Handles error thrown during HTTP call
     * @param error:any
     * @returns {Promise<never>}
     */
    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }
}
