import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8082/auth';
  private authStatus = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  getAuthStatus(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.apiUrl}/login`, { username, password }, { headers }).pipe(
      tap((response: any) => {
        if (response && response.message === 'Login successful') {
          localStorage.setItem('username', response.username);
          localStorage.setItem('role', response.role);
          localStorage.setItem('userId', String(response.userId)); // Almacena el userId
          localStorage.setItem('authHeader', `Basic ${btoa(`${username}:${password}`)}`); // Almacena el encabezado de autenticación
          this.authStatus.next(true);
        } else {
          console.error('Error: Respuesta del servidor inválida.');
        }
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, { username: this.getUsername() }).pipe(
      tap(() => {
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        localStorage.removeItem('userId');
        localStorage.removeItem('authHeader');
        this.authStatus.next(false);
      })
    );
  }

  getAuthHeader(): string {
    return localStorage.getItem('authHeader') || '';
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  getUserId(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? +userId : null;
  }

  getUserRole(): string | null {
    return localStorage.getItem('role');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('username');
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'ROLE_ADMIN';
  }
  
  // Método para registrar un nuevo usuario
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

}
