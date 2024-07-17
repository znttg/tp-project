import { HttpClient } from '@angular/common/http';
import { inject, Injectable} from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}`;
  
  http = inject(HttpClient);

  login(credentials: { email: string; password: string }): Observable<any> {
    const body = { user: { email: credentials.email, password: credentials.password }}
    return this.http.post<any>(`${this.apiUrl}/login`, body); 
  }

  signUp(user: { name: string; email: string; password: string; }): Observable<any> {
    const body = { user: { email: user.email, password: user.password, name: user.name }}
    return this.http.post<any>(`${this.apiUrl}/signup`, body);
  }

  getUserProfile(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profile`);
  }

  signOut(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}