import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HandPickedComponent } from './hand-picked/hand-picked.component';
import { HeaderComponent } from './header/header.component';
import { LatestStoryComponent } from './latest-story/latest-story.component';
import { LoginComponent } from './login/login.component';

import { LatestStoryService } from './latest-story.service';
import { HandPickedService } from './hand-picked.service';
import { UserPostsService } from './user-posts.service';
import { AdminService } from './admin.service';
import { UserService } from './user.service';
import { AuthenticationService } from './authentication.service';
import { DribbblePostService } from './dribbble-post.service';

import { HomeComponent } from './home/home.component';
import { UserPostsComponent } from './user-posts/user-posts.component';
import { AppRoutingModule } from './/app-routing.module';
import { AdminComponent } from './admin/admin.component';
import { UpdatePostsComponent } from './update-posts/update-posts.component';
import { FooterComponent } from './footer/footer.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { DribbblePostComponent } from './dribbble-post/dribbble-post.component';

export const APP_ID = 'my-app';

@NgModule({
  declarations: [
    AppComponent,
    HandPickedComponent,
    HeaderComponent,
    LatestStoryComponent,
    LoginComponent,
    HomeComponent,
    UserPostsComponent,
    AdminComponent,
    UpdatePostsComponent,
    FooterComponent,
    PostDetailComponent,
    DribbblePostComponent
  ],
  imports: [
      BrowserModule.withServerTransition({ appId: APP_ID }), InfiniteScrollModule , FormsModule, ReactiveFormsModule, HttpClientModule, BrowserAnimationsModule, AppRoutingModule
  ],
  providers: [LatestStoryService,HandPickedService,UserPostsService,AdminService,UserService,AuthenticationService,DribbblePostService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
