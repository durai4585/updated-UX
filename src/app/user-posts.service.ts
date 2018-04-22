import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Posts} from './posts';

@Injectable()
export class UserPostsService {

  private host = window.location.hostname;
    private headers = new HttpHeaders({'Content-Type': 'application/json'});
    private usersURL = 'https://www.buxdio.com/add_posts';

constructor(private http: HttpClient) { }

/**
 * Adds new user
 * @param posts:Posts
 * @returns {Promise<Posts>}
 */
add(user: Posts): Promise<Posts>{
  return this.http.post(this.usersURL, user, {headers: this.headers})
    .toPromise()
    .then(response => response)
    .catch(this.handleError)
}

subscribe(email: string){
  return this.http.post('https://www.buxdio.com/add_subscribe',{ email: email }, {headers: this.headers})
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
