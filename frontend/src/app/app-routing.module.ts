import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { ListPostComponent } from './posts/list-post/list-post.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  {path:'',component:ListPostComponent},
  {path:'create',component:CreatePostComponent, canActivate:[AuthGuard]  },
  {path:'edit/:postId',component:CreatePostComponent ,  canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
