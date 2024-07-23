import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Contact } from '../../models/contact';
import { createContact, deleteContact, loadContacts, updateContact } from '../contacts/contacts.actions';
import { ContactsState } from '../contacts/contacts.reducer';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule, ModalComponent],
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  @Input() clientId!: number;
  contacts$: Observable<Contact[]>;

  private formBuilder = inject(FormBuilder)
  private store = inject(Store<{contact: ContactsState}>)

  contactForm: FormGroup;
  selectedContactId: number | null = null;
  showContactModal: boolean = false;
  showDeleteModal: boolean = false;
  contactToDelete: number | null = null;
  

  constructor() {
    this.contacts$ = this.store.pipe(select(state => state.contact.contacts));
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      first_name: ['', Validators.required],
      tel: ['', Validators.required],
      ext: [''],
      email: ['', [Validators.required, Validators.email]]
    });

    
  }

  ngOnInit(): void {
    if (this.clientId) {
      this.store.dispatch(loadContacts({ clientId: this.clientId }));
    }
  }

  openCreateModal(): void {
    this.selectedContactId = null;
    this.contactForm.reset();
    this.showContactModal = true;
  }

  openEditModal(contact: Contact): void {
    this.selectedContactId = contact.id;
    this.contactForm.patchValue(contact);
    this.showContactModal = true;
  }

  openDeleteModal(id: number): void {
    this.contactToDelete = id;
    this.showDeleteModal = true;
  }

  closeModal(): void {
    this.showContactModal = false;
    this.showDeleteModal = false;
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      if (this.selectedContactId) {
        this.store.dispatch(updateContact({ contactId: this.selectedContactId, contact: this.contactForm.value }));
      } else {
        this.store.dispatch(createContact({ clientId: this.clientId, contact: this.contactForm.value }));
      }
      this.closeModal();
    }
  }

  editContact(contact: Contact): void {
    this.selectedContactId = contact.id;
    this.contactForm.patchValue(contact);
  }

  deleteContact(): void {
    if (this.contactToDelete !== null) {
      this.store.dispatch(deleteContact({ clientId: this.clientId, contactId: this.contactToDelete }));
      this.closeModal();
    }
  }

  // deleteContact(contactId: number): void {
  //   if (confirm('Are you sure you want to delete this contact?')) {
  //     this.store.dispatch(deleteContact({ clientId: this.clientId, contactId }));
  //   }
  // }

  resetForm(): void {
    this.contactForm.reset();
    this.selectedContactId = null;
  }
}