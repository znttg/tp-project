import { HttpClient } from '@angular/common/http';
import { inject, Injectable} from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}`;
  
  http = inject(HttpClient);

  login(credentials: { email: string; password: string }): Observable<User> {
    const body = { user: { email: credentials.email, password: credentials.password }}
    return this.http.post<User>(`${this.apiUrl}/login`, body);
  }

  signUp(user: { name: string; email: string; password: string; }): Observable<User> {
    const body = { user: { email: user.email, password: user.password, name: user.name }}
    return this.http.post<User>(`${this.apiUrl}/signup`, body);
  }

  getUserProfile(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profile`);
  }
}