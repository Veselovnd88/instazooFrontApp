import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {IndexComponent} from "./layout/index/index.component";
import {authGuard} from "./service/auth.guard";
import {ProfileComponent} from "./user/profile/profile.component";
import {UserPostsComponent} from "./user/user-posts/user-posts.component";
import {AddPostComponent} from "./user/add-post/add-post.component";

// @ts-ignore
const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: 'main', component: IndexComponent, canActivate: [authGuard]},
  {
    path: 'profile', component: ProfileComponent, canActivate: [authGuard], children: [
      {path: '', component: UserPostsComponent, canActivate: [authGuard]},
      {path: 'add', component: AddPostComponent, canActivate: [authGuard]}
    ]
  },
  {path: '', redirectTo: 'main', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
