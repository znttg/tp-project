import { createAction, props } from '@ngrx/store';
import { Contact } from '../../models/contact';

export const loadContacts = createAction('[Contact] Load Contacts', props<{ clientId: number }>());
export const loadContactsSuccess = createAction('[Contact] Load Contacts Success', props<{ contacts: Contact[] }>());
export const loadContactsFailure = createAction('[Contact] Load Contacts Failure', props<{ error: string }>());

export const createContact = createAction('[Contact] Create Contact', props<{ clientId: number, contact: Contact }>());
export const createContactSuccess = createAction('[Contact] Create Contact Success', props<{ contact: Contact }>());
export const createContactFailure = createAction('[Contact] Create Contact Failure', props<{ error: string }>());

export const updateContact = createAction('[Contact] Update Contact', props<{ clientId: number, contact: Contact }>());
export const updateContactSuccess = createAction('[Contact] Update Contact Success', props<{ contact: Contact }>());
export const updateContactFailure = createAction('[Contact] Update Contact Failure', props<{ error: string }>());

export const deleteContact = createAction('[Contact] Delete Contact', props<{ clientId: number, contactId: number }>());
export const deleteContactSuccess = createAction('[Contact] Delete Contact Success', props<{ contactId: number }>());
export const deleteContactFailure = createAction('[Contact] Delete Contact Failure', props<{ error: string }>());