import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../services/post.service';
import { Post } from '../models/post';

@Component({
  selector: 'app-tag-post',
  templateUrl: './tag-post.component.html',
  styleUrls: ['./tag-post.component.css']
})
export class TagPostComponent implements OnInit {
  posts: Post[] = [];          // Todos los posts
  filteredPosts: Post[] = [];  // Posts filtrados por la etiqueta seleccionada
  tag: string = '';            // Etiqueta seleccionada

  constructor(private postService: PostService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Obtener la etiqueta desde la URL
    this.route.paramMap.subscribe(params => {
      this.tag = params.get('tag') || '';
      this.loadPostsByTag(this.tag);  // Cargar los posts filtrados por etiqueta
    });
  }

// Método para cargar los posts filtrados por una etiqueta y ordenarlos por fecha descendente
loadPostsByTag(tag: string): void {
  this.postService.getPosts().subscribe({
    next: (data) => {
      // Filtrar los posts por etiqueta y luego ordenarlos por fecha descendente
      this.filteredPosts = data
        .filter(post => post.tags.includes(tag))
        .sort((a, b) => {
          // Validar que ambos campos date existan y convertirlos a tiempo
          const dateA = a.date ? new Date(a.date).getTime() : 0;
          const dateB = b.date ? new Date(b.date).getTime() : 0;
          return dateB - dateA; // Ordenar de más reciente a más antiguo
        });

      console.log('Posts filtrados y ordenados por etiqueta:', this.filteredPosts);
    },
    error: (err) => {
      console.error('Error al cargar los posts', err);
    }
  });
}
}
