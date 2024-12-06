import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularMaterialModule } from './AngularMaterialModule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreatePostComponent } from './create-post/create-post.component';
import { ShowPostsComponent } from './show-posts/show-posts.component';
import { LoginComponent } from './login/login.component';
import { provideHttpClient } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { TagPostComponent } from './tag-post/tag-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';

@NgModule({
  declarations: [
    AppComponent,
    CreatePostComponent,
    ShowPostsComponent,
    LoginComponent,
    RegisterComponent,
    PostDetailComponent,
    TagPostComponent,
    EditPostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
