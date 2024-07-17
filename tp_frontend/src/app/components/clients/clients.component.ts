import { Component, OnInit } from '@angular/core';
import { AppState } from '../../store/app.state';
import { select, Store } from '@ngrx/store';
import { ClientsService } from '../../services/clients/clients.service';
import { Observable } from 'rxjs';
import { Client } from '../../models/client';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements OnInit {

  clients$?: Observable<Client[]>;

  constructor(
    private store: Store<AppState>,
    private clientsService: ClientsService
  ) { }

  ngOnInit(): void {
    this.clientsService.fetchClients().subscribe(data => console.log(data));
  }
}