import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { Post } from '../models/post';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  post: Post = {
    id: 0,
    title: '',
    content: '',
    postedBy: '',
    img: '',
    date: new Date(),
    likeCount: 0,
    viewCount: 0,
    commentCount: 0,
    tags: []  // Inicializa como array vacío
  };

  tagsInput: string = ''; // Cadena para capturar las etiquetas ingresadas

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId) {
      this.loadPost(Number(postId));
    }
  }

  // Cargar el post a editar
  loadPost(id: number): void {
    this.postService.getPostById(id).subscribe({
      next: (data) => {
        this.post = data;
        this.tagsInput = this.post.tags.join(', ');
      },
      error: (err) => {
        console.error('Error al cargar el post', err);
      }
    });
  }

  // Enviar los cambios al backend
  onSubmit(): void {
    // Convertir la cadena de tags en un array
    this.post.tags = this.tagsInput.split(',')
    .map(tag => tag.trim().toLowerCase());

    this.postService.updatePost(this.post.id!, this.post).subscribe({
      next: () => {
        alert('Post actualizado exitosamente');
        this.router.navigate(['/show-posts']);
      },
      error: (err) => {
        console.error('Error al actualizar el post', err);
      }
    });
  }
}
