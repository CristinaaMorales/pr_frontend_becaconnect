import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  hidePassword: boolean = true; 
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        if (response.message === "Login successful") {
          console.log('Login successful', response);
          this.router.navigate(['/show-posts']);  // Redirigir a "show-posts" después del login exitoso
        }
      },
      error: (err) => {
        this.errorMessage = err.error ? err.error.error : 'An error occurred';
        console.error(err);
      }
    });
  }
}
