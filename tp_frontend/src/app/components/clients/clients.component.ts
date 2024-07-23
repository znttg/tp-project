import { Component, inject, OnInit } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { Client } from '../../models/client';
import { select, Store } from '@ngrx/store';
import { getClientsError, selectAllClients } from './clients.selectors'
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { addClient, deleteClient, loadClients } from './clients.actions';
import { logout } from '../../auth/auth.actions';
import { ClientsState } from './clients.reducer';
import { ModalComponent } from '../modal/modal.component';
import { ActivityType } from '../../models/activity-type.enum';
import { canadianPostalCodeValidator } from '../../validators/postal-code.validator';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, ModalComponent],
  providers: [],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements OnInit {

  private formBuilder = inject(FormBuilder)
  private store = inject(Store<{client: ClientsState}>)
  private router = inject(Router);

  clients$: Observable<Client[]>;
  error$: Observable<any>;

  clientForm: FormGroup; 
  activityTypes = Object.values(ActivityType);
  showModal: boolean = false;
  deleteClientId: number | null = null;

  errorCatcher!: Subscription;

  constructor() {
    this.clients$ = this.store.pipe(select(selectAllClients));
    this.error$ = this.store.pipe(select(getClientsError))
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
  }

  ngOnInit() {
    this.store.dispatch(loadClients());
    this.errorCatcher = this.error$.subscribe((error) => {
      if  (error && error.status === 401) {
        console.error('Unauthorized access - redirecting to login');
        this.store.dispatch(logout());
      }
    })
  }

  ngOnDestroy(){
    this.errorCatcher.unsubscribe();
  }

  reload(){
    this.router.navigate([this.router.url])
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.clientForm.reset();
    this.deleteClientId = null;
  }

  saveClient(): void {
    if (this.clientForm.valid) {
      this.store.dispatch(addClient({ client: this.clientForm.value }));
      this.closeModal();
    }
  }

  confirmDeleteClient(id: number): void {
    this.deleteClientId = id;
    this.openModal();
  }

  deleteClient(): void {
    if (this.deleteClientId !== null) {
      this.store.dispatch(deleteClient({ clientId: this.deleteClientId }));
      this.closeModal();
    }
  }

  onPostalCodeInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.toUpperCase();
    this.clientForm.get('address_postal_code')?.setValue(input.value);
  }
}