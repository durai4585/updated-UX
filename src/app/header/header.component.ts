import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Users} from '../users';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public static updateUserStatus: Subject<boolean> = new Subject();
currentUser: Users;
isAdmin=false;
  constructor(  private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(this.currentUser){this.isAdmin=true}else{this.isAdmin=false}
    HeaderComponent.updateUserStatus.subscribe(res => {
  this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
if(this.currentUser){this.isAdmin=true}else{this.isAdmin=false}
  })


   console.log(  this.currentUser);
   console.log(  this.isAdmin); }
  ngOnInit() {
  }
  logout() {
    this.currentUser = null;
       localStorage.removeItem('currentUser');
       this.isAdmin=false;
         this.router.navigate(['/login']);
   }

}
