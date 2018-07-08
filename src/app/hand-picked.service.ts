import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from "rxjs/observable/forkJoin";
import 'rxjs/add/operator/map';
import { HOST } from "./constant";

@Injectable()
export class HandPickedService {
private headers = new HttpHeaders({'Content-Type': 'application/json'});
constructor(private _http: HttpClient) { }

  getScreenShots(page: number): Observable<any[]> {
    return forkJoin([
    this._http.get(HOST+'/handpick/post/getbypage/'+ page)
    ]);
  }
  getPostById(_id: string){
    return forkJoin([
    this._http.get<any[]>(HOST+'/handpick/post/getbyid/'+ _id)
    ]);
  }

  add_viewcount(_id: string){
    //console.log(posts);
    return this._http.put(HOST+'/handpick/viewcount/update', { _id: _id }, {headers: this.headers})
      .toPromise()
      .then(response => response)
  }
  add_likecount(_id: string){
    //console.log(posts);
    return this._http.put(HOST+'/handpick/likecount/update', { _id: _id }, {headers: this.headers})
      .toPromise()
      .then(response => response)
  }

}
