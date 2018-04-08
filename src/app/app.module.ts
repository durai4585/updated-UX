import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HandPickedComponent } from './hand-picked/hand-picked.component';
import { HeaderComponent } from './header/header.component';
import { LatestStoryComponent } from './latest-story/latest-story.component';
import { LoginComponent } from './login/login.component';

import { LatestStoryService } from './latest-story.service';
import { HandPickedService } from './hand-picked.service';
import { UserPostsService } from './user-posts.service';
import { AdminService } from './admin.service';

import { HomeComponent } from './home/home.component';
import { UserPostsComponent } from './user-posts/user-posts.component';
import { AppRoutingModule } from './/app-routing.module';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    HandPickedComponent,
    HeaderComponent,
    LatestStoryComponent,
    LoginComponent,
    HomeComponent,
    UserPostsComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule, InfiniteScrollModule , FormsModule, ReactiveFormsModule, HttpClientModule, AppRoutingModule
  ],
  providers: [LatestStoryService,HandPickedService,UserPostsService,AdminService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
