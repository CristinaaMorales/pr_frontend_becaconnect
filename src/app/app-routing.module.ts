import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { ShowPostsComponent } from './show-posts/show-posts.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { TagPostComponent } from './tag-post/tag-post.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/show-posts', pathMatch: 'full' }, 
  { path: 'create-post', component: CreatePostComponent },
  { path: 'tags/:tag', component: TagPostComponent },
  { path: 'post/:id', component: PostDetailComponent },
  { path: 'edit-post/:id', component: EditPostComponent },
  { path: 'show-posts', component: ShowPostsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
