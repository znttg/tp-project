import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private apiUrl = 'http://localhost:3001'

  constructor(private http: HttpClient) {}

  fetchClients(): Observable<any> {
    return this.http.get(`${this.apiUrl}/clients`);
  }
}