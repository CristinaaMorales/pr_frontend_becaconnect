import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { AuthService } from '../services/auth.service';
import { Post } from '../models/post';
import { Comment } from '../models/post.comment';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  post: Post | undefined;
  comments: Comment[] = [];
  newComment: Comment = { content: '', username: '' };
  loggedInUsername: string | null = null;
  userRole: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadPost(Number(id));
      this.loadComments(Number(id));
    }

  this.authService.getAuthStatus().subscribe((isAuthenticated: boolean) => {
    if (isAuthenticated) {
      this.loggedInUsername = this.authService.getUsername();
      this.newComment.username = this.loggedInUsername; 
      this.userRole = this.authService.getUserRole();
    } else {
      this.loggedInUsername = null;
      this.newComment.username = 'Guest';
      this.userRole = null;
    }
  });
}
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  loadPost(id: number): void {
    this.postService.getPostById(id).subscribe({
      next: (data) => {
        this.post = data;
      },
      error: (err) => {
        console.error('Error al cargar el post', err);
        this.router.navigate(['/']);
      }
    });
  }

  loadComments(postId: number): void {
    console.log(`Cargando comentarios para el postId: ${postId}`); // Validación
    this.postService.getComments(postId).subscribe({
      next: (comments: any[]) => {
        this.comments = comments.map(comment => ({
          ...comment,
          username: comment.user || 'Guest', 
        }));
        console.log('Comentarios cargados y procesados:', this.comments);
      },
      error: (err) => {
        console.error('Error al cargar los comentarios:', err);
      },
    });
  }
  



  errorMessage: string | null = null;

  addComment(): void {
    if (this.newComment.content.trim()) {
      if (!this.isAuthenticated() && (!this.newComment.username || !this.newComment.username.trim())) {
        this.newComment.username = 'Guest';
      }
  
      console.log('Comentario enviado al backend:', this.newComment);
  
      this.postService.addComment(this.post?.id!, this.newComment).subscribe({
        next: (comment) => {
          this.comments.push({
            ...comment,
            username: this.newComment.username, 
          });
          this.newComment.content = ''; 
          if (!this.isAuthenticated()) {
            this.newComment.username = ''; 
          }
          console.log('Comentario agregado:', comment);
        },
        error: (err) => {
          console.error('Error al agregar el comentario:', err);
        },
      });
    } else {
      console.warn('El comentario está vacío.');
    }
  }
  

  goBack(): void {
    this.router.navigate(['/show-posts']);
  }
  
  editPost(): void {
    if (this.post) {
      this.router.navigate([`/edit-post/${this.post.id}`]);
    }
  }

  deletePost(): void {
    if (confirm('¿Estás seguro de que deseas eliminar este post?')) {
      this.postService.deletePost(this.post?.id!).subscribe({
        next: () => {
          alert('Post eliminado exitosamente');
          this.router.navigate(['/show-posts']);  
        },
        error: (err) => {
          console.error('Error al eliminar el post:', err); 
          alert('Ocurrió un error al intentar eliminar el post');
        }
      });
    }
  }
  
  likePost(): void {
    if (this.post) {
      this.postService.likePost(this.post.id!).subscribe({
        next: (updatedPost) => {
          this.post = updatedPost;
          console.log('Like registrado correctamente');
        },
        error: (err) => {
          console.error('Error al registrar el like:', err);
        }
      });
    }
  }
  
  
}
