import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: any = { username: '', password: '' };
  confirmPassword: string = '';
  errorMessage: string = '';

  // Variables para el control de la visibilidad de las contraseñas
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
   
  constructor(private authService: AuthService, private router: Router) {}

  register() {
    if (this.user.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    this.authService.register(this.user).subscribe({
      next: (response) => {
        console.log('Usuario registrado exitosamente:', response);
        this.router.navigate(['/login']); // Redirigir al login después de registrarse
      },
      error: (err) => {
        console.error('Error al registrar el usuario:', err);
        this.errorMessage = 'Ocurrió un error al registrar el usuario.';
      },
    });
  }
}
