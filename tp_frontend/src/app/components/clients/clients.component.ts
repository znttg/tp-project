import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../../models/client';
import { AppState } from '../../store/app.state';
import { select, Store } from '@ngrx/store';
import { getClients } from './clients.selectors'

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [],
  providers: [],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements OnInit {

  clients$: Observable<Client[]>;
  private store = inject(Store<AppState>)

  constructor() {
    this.clients$ = this.store.pipe(select(getClients));
  }

  ngOnInit(): void {

  }
}