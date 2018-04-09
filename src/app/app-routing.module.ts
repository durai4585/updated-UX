import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent}   from './home/home.component';
import {UserPostsComponent}     from './user-posts/user-posts.component';
import {AdminComponent}     from './admin/admin.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'userposts', component: UserPostsComponent},
  {path: 'admin', component: AdminComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}