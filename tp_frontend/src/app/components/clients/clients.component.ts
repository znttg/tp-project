import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../../models/client';
import { AppState } from '../../store/app.state';
import { select, Store, StoreModule } from '@ngrx/store';
import { selectAllClients } from './clients.selectors'
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { addClient, deleteClient, loadClients } from './clients.actions';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  providers: [],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements OnInit {

  clients$: Observable<Client[]>;
  private store = inject(Store<AppState>)

  constructor() {
    this.clients$ = this.store.pipe(select(selectAllClients));
  }

  ngOnInit() {
    this.store.dispatch(loadClients());
  }

  onAddClient() {
    const newClient: Client = {
      id: 1,
      name: 'string',
      relationship_start: new Date,
      address_city: 'string',
      address_postal_code: 'string',
      address_street: 'string',
      address_apt: 'string',
      activity_type: 1,
      info_email: 'string',
    };
    this.store.dispatch(addClient({ client: newClient }));
  }

  onDeleteClient(clientId: number) {
    this.store.dispatch(deleteClient({ clientId }));
  }
}