import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from "rxjs/observable/forkJoin";
import 'rxjs/add/operator/map';

@Injectable()
export class HandPickedService {
private headers = new HttpHeaders({'Content-Type': 'application/json'});
constructor(private _http: HttpClient) { }

  getScreenShots(page: number): Observable<any[]> {
    return forkJoin([
    this._http.get('https://www.buxd.io/hand-picked-posts/'+ page)
    ]);
  }
  getPostById(_id: string){
    return forkJoin([
    this._http.get<any[]>('https://www.buxd.io/hand-picked-posts/getbyid/'+ _id)
    ]);
  }

  add_viewcount(_id: string){
    //console.log(posts);
    return this._http.put('https://www.buxd.io/add_viewcount', { _id: _id }, {headers: this.headers})
      .toPromise()
      .then(response => response)
  }
  add_likecount(_id: string){
    //console.log(posts);
    return this._http.put('https://www.buxd.io/add_likecount', { _id: _id }, {headers: this.headers})
      .toPromise()
      .then(response => response)
  }

}
