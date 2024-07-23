import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ClientsService } from '../../services/clients/clients.service';
import { Store } from '@ngrx/store';
import { ClientsState } from '../clients/clients.reducer';
import { loadClients, updateClient } from '../clients/clients.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-client',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './edit-client.component.html',
  styleUrl: './edit-client.component.css'
})
export class EditClientComponent {
  private store = inject(Store<{ client: ClientsState }>)
  private fb = inject(FormBuilder)
  private route = inject(ActivatedRoute)
  private router = inject(Router);
  private clientService = inject(ClientsService)
  
  clientForm: FormGroup;
  id: number;

  constructor() {
    this.id = this.route.snapshot.params['id'];
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      relationship_start: ['', Validators.required],
      address_city: ['', Validators.required],
      address_postal_code: ['', Validators.required],
      address_street: ['', Validators.required],
      address_apt: [''],
      activity_type: ['', Validators.required],
      info_email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.clientService.getClient(this.id).subscribe((client) => {
      this.clientForm.patchValue(client);
    });
  }

  updateClient(): void {
    if (this.clientForm.valid) {
      this.store.dispatch(updateClient({ clientId: this.id, client: this.clientForm.value }));
      this.router.navigate(['/clients']);
    }
  }
}
