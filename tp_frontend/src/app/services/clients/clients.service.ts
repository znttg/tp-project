import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private apiUrl = 'http://localhost:3001/clients'; // Replace with your Rails API URL

  constructor(private http: HttpClient) {}

  fetchClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}`);
  }
}