import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { Comment } from '../models/post.comment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = 'http://localhost:8082/api/posts';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: this.authService.getAuthHeader(),
      'Content-Type': 'application/json',
    });
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/create`, post, { headers: this.getHeaders() });
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }

  getComments(postId: number): Observable<Comment[]> {
    const url = `${this.apiUrl}/${postId}/comments`;
    console.log('URL de comentarios:', url);
    return this.http.get<Comment[]>(url);
  }
  

  addComment(postId: number, comment: any): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/${postId}/comments`, comment, { headers: this.getHeaders() });
  }

  deletePost(postId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${postId}`, { headers: this.getHeaders() });
  }

  updatePost(postId: number, post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/${postId}`, post, { headers: this.getHeaders() });
  }

  likePost(postId: number): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/${postId}/like`, null, { headers: this.getHeaders() });
  }
}
