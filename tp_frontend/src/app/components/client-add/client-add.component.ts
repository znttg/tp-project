import { Component, inject } from '@angular/core';
import { Client } from '../../models/client';
import { addClient } from '../clients/clients.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-client-add',
  standalone: true,
  imports: [],
  templateUrl: './client-add.component.html',
  styleUrl: './client-add.component.css'
})
export class ClientAddComponent {
  private store = inject(Store);

  onSubmit() {
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

}
