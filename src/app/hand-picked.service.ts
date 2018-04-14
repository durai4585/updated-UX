import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from "rxjs/observable/forkJoin";
import 'rxjs/add/operator/map';

@Injectable()
export class HandPickedService {

constructor(private _http: HttpClient) { }

  getScreenShots(page: number): Observable<any[]> {
    return forkJoin([
    this._http.get('http://buxdio.com/hand-picked-posts')
    ]);
  }
}
