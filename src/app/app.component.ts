import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'blogBeca';
  loggedInUsername: string | null = null;
  searchTag: string = ''; 
  userRole: string | null = null;
  isPanelOpen = {
    mentor: false,
    services: false,
    successStories: false,
  };

  togglePanel(panel: 'mentor' | 'services' | 'successStories') {
    Object.keys(this.isPanelOpen).forEach((key) => {
      this.isPanelOpen[key as keyof typeof this.isPanelOpen] = key === panel ? !this.isPanelOpen[key] : false;
    });
  }

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      localStorage.removeItem('username');
      localStorage.removeItem('role');
      localStorage.removeItem('userId');
    }

    this.authService.getAuthStatus().subscribe((isAuthenticated: boolean) => {
      if (isAuthenticated) {
        this.loggedInUsername = this.authService.getUsername();
        this.userRole = this.authService.getUserRole();
      } else {
        this.loggedInUsername = null;
        this.userRole = null;
      }
    });
  }


  searchPostsByTag(): void {
    const tag = this.searchTag.trim();
    if (tag) {
      this.router.navigate(['/tags', tag.toLowerCase()]);
      this.searchTag = ''; 
    }
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  // Verificar si el usuario es admin
  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  // Método para cerrar sesión
  logout() {
    this.authService.logout().subscribe(() => {
      this.loggedInUsername = null;
      this.userRole = null;
      this.router.navigate(['/show-posts']);
    });
  }

  // Mostrar alerta al contactar al mentor
  contactMentor(): void {
    alert('¡Gracias por tu interés! Puedes contactar a Arturo Gaijin en: arturo.gaijin@mentoria.com');
  }


}
