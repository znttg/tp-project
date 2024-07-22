import { Component, inject, OnInit } from '@angular/core';
import { async, Observable, pipe } from 'rxjs';
import { Client } from '../../models/client';
import { AppState } from '../../store/app.state';
import { ActionsSubject, select, Store, StoreModule } from '@ngrx/store';
import { getClientsError, selectAllClients } from './clients.selectors'
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { addClient, deleteClient, loadClients } from './clients.actions';
import { isLoggedIn, selectError } from '../../auth/auth.selectors';
import { asyncScheduler } from 'rxjs';
import { logout } from '../../auth/auth.actions';


@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  providers: [],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements OnInit {

  private store = inject(Store<AppState>)
  clients$: Observable<Client[]>;
  error$: Observable<any>;
  isAuthenticated$ = this.store.pipe(select(isLoggedIn));

  constructor() {
    this.clients$ = this.store.pipe(select(selectAllClients));
    this.error$ = this.store.pipe(select(getClientsError))
  }

  ngOnInit() {
    this.store.dispatch(loadClients());
    this.error$.subscribe((error) => {
      if  (error && error.status === 401) {
        console.error('Unauthorized access - redirecting to login');
        this.store.dispatch(logout())
      }
    })
  }

  onAddClient() {

  }

  onDeleteClient(clientId: number) {
    this.store.dispatch(deleteClient({ clientId }));
  }
}