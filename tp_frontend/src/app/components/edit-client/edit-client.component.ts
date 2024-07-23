import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ClientsService } from '../../services/clients/clients.service';
import { Store } from '@ngrx/store';
import { ClientsState } from '../clients/clients.reducer';
import { loadClient, updateClient } from '../clients/clients.actions';
import { CommonModule } from '@angular/common';
import { ActivityType } from '../../models/activity-type.enum';
import { canadianPostalCodeValidator } from '../../validators/postal-code.validator';
import { Observable } from 'rxjs';
import { ContactsComponent } from '../contacts/contacts.component';
import { Client } from '../../models/client';

@Component({
  selector: 'app-edit-client',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule, ContactsComponent],
  templateUrl: './edit-client.component.html',
  styleUrl: './edit-client.component.css'
})
export class EditClientComponent {
  private store = inject(Store<{ client: ClientsState }>)
  
  private formBuilder = inject(FormBuilder)
  private route = inject(ActivatedRoute)
  private router = inject(Router);
  private clientService = inject(ClientsService)
  
  client$: Observable<Client>;
  clientForm: FormGroup;
  clientId: number;
  activityTypes = Object.values(ActivityType);
  selectedTab: string = 'client';

  constructor() {
    this.clientId = +this.route.snapshot.paramMap.get('id')!;
    this.clientForm = this.formBuilder.group({
      name: ['', Validators.required],
      relationship_start: ['', Validators.required],
      address_city: ['', Validators.required],
      address_postal_code: ['', [Validators.required, canadianPostalCodeValidator()]],
      address_street: ['', Validators.required],
      address_apt: ['', [Validators.maxLength(12)]],
      activity_type: ['', Validators.required],
      info_email: ['', [Validators.required, Validators.email]]
    });

    this.client$ = this.store.select((state) => state.client.client);
  }

  ngOnInit(): void {
    this.clientId = this.route.snapshot.params['id'];
    this.store.dispatch(loadClient({ clientId: this.clientId }));

    // this.client$ = this.store.select(state => state.client.client);

    this.clientService.getClient(this.clientId).subscribe((client) => {
      this.clientForm.patchValue(client);
    });
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }

  updateClient(): void {
    if (this.clientForm.valid) {
      this.store.dispatch(updateClient({ clientId: this.clientId, client: this.clientForm.value }));
      this.router.navigate(['/clients']);
    }
  }

  onPostalCodeInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.toUpperCase();
    this.clientForm.get('address_postal_code')?.setValue(input.value);
  }
}

