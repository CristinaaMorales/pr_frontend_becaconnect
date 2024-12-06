import { Component } from '@angular/core';
import { PostService } from '../services/post.service';
import { Post } from '../models/post';
import { Router } from '@angular/router'; // Importa el Router para redirigir
import { AuthService } from '../services/auth.service'; // Importa AuthService para verificar el rol del usuario

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {

  post: Post = {
    title: '',
    content: '',
    postedBy: 'admin',  // Suponiendo que el admin crea el post
    img: '',            // URL de la imagen
    date: new Date(),   // Inicializa la fecha con la fecha actual
    likeCount: 0,       // Inicializa a 0
    viewCount: 0,       // Inicializa a 0
    commentCount: 0,    // Inicializa a 0
    tags: []            // Inicializa como un array vacío
  };

  tagsInput: string = ''; // Cadena para capturar las etiquetas ingresadas
  isAdmin: boolean = false; // Variable para determinar si el usuario es admin

  constructor(private postService: PostService, private router: Router, private authService: AuthService) {
    this.isAdmin = this.authService.isAdmin(); // Verifica si el usuario es admin
  }

  // Método para enviar el post al backend
  submitPost() {
    if (this.isAdmin) {
      // Convertir las etiquetas en un array, eliminar espacios y convertir a minúsculas
      this.post.tags = this.tagsInput.split(',')
                          .map(tag => tag.trim().toLowerCase());  // Convertir a minúsculas
  
      this.postService.createPost(this.post).subscribe({
        next: (data) => {
          console.log('Post creado exitosamente', data);
          alert('Post creado exitosamente!');
          this.router.navigate(['/show-posts']);  // Redirigir a la lista de posts
        },
        error: (err) => {
          console.error('Error al crear el post', err);
          alert('Error al crear el post');
        }
      });
    } else {
      alert('No tienes permiso para crear posts');
    }
  }
  
}
