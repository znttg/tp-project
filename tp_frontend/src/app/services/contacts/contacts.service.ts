import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getContacts(clientId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/clients/${clientId}/contacts`);
  }

  getContact(clientId: number, contactId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/clients/${clientId}/contacts/${contactId}`);
  }

  createContact(clientId: number, contact: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/clients/${clientId}/contacts`, { contact });
  }

  updateContact(clientId: number, contactId: number, contact: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/clients/${clientId}/contacts/${contactId}`, { contact });
  }

  deleteContact(clientId: number, contactId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/clients/${clientId}/contacts/${contactId}`);
  }
}