import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { Post } from '../models/post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-posts',
  templateUrl: './show-posts.component.html',
  styleUrls: ['./show-posts.component.css']
})
export class ShowPostsComponent implements OnInit {
  posts: any[] = []; 
  searchTag: string = '';  // Campo de búsqueda

  constructor(private postService: PostService,private router: Router) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  // Método para cargar los posts desde el backend
  loadPosts(): void {
    this.postService.getPosts().subscribe({
      next: (data) => {
        // Ordenar los posts del más reciente al más antiguo
        this.posts = data.sort((a, b) => {
          // Validar que ambos campos date existan y sean válidos
          const dateA = a.date ? new Date(a.date).getTime() : 0;
          const dateB = b.date ? new Date(b.date).getTime() : 0;
          return dateB - dateA;  // Ordenar de más reciente a más antiguo
        });
        console.log('Posts cargados y ordenados exitosamente', data);
      },
      error: (err) => {
        console.error('Error al cargar los posts', err);
      }
    });
  }
    // Navegar al detalle del post
    goToPostDetail(postId: number): void {
      this.router.navigate(['/post', postId]);
    }

    // Redirigir al componente de tags al buscar
    searchPostsByTag(): void {
          const tag = this.searchTag.trim();
          if (tag) {
            this.router.navigate(['/tags', tag.toLowerCase()]);  // Navegar al TagPostComponent
            this.searchTag = '';  // Limpiar el campo de búsqueda
          }
    }
    
}
