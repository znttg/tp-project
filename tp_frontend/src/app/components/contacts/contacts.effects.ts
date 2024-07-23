import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ContactService } from '../../services/contacts/contacts.service';
import { loadContacts, loadContactsSuccess, loadContactsFailure, createContact, createContactSuccess, createContactFailure, updateContact, updateContactSuccess, updateContactFailure, deleteContact, deleteContactSuccess, deleteContactFailure } from './contacts.actions';

@Injectable()
export class ContactEffects {
  constructor(private actions$: Actions, private contactService: ContactService) {}

  loadContacts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadContacts),
      mergeMap(({ clientId }) =>
        this.contactService.getContacts(clientId).pipe(
          map(contacts => loadContactsSuccess({ contacts })),
          catchError(error => of(loadContactsFailure({ error })))
        )
      )
    )
  );

  createContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createContact),
      mergeMap(({ clientId, contact }) =>
        this.contactService.createContact(clientId, contact).pipe(
          map(newContact => createContactSuccess({ contact: newContact })),
          catchError(error => of(createContactFailure({ error })))
        )
      )
    )
  );

  updateContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateContact),
      mergeMap(({ clientId, contact }) =>
        this.contactService.updateContact(clientId, contact.id!, contact).pipe(
          map(updatedContact => updateContactSuccess({ contact: updatedContact })),
          catchError(error => of(updateContactFailure({ error })))
        )
      )
    )
  );

  deleteContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteContact),
      mergeMap(({ clientId, contactId }) =>
        this.contactService.deleteContact(clientId, contactId).pipe(
          map(() => deleteContactSuccess({ contactId })),
          catchError(error => of(deleteContactFailure({ error })))
        )
      )
    )
  );
}