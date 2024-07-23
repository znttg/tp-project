import { createReducer, on } from '@ngrx/store';
import { loadContactsSuccess, loadContactsFailure, createContactSuccess, createContactFailure, deleteContactSuccess, deleteContactFailure, updateContactSuccess, updateContactFailure } from './../contacts/contacts.actions';
import { Contact } from '../../models/contact';

export interface ContactsState {
    contacts: Contact[];
    error: any;
  }
  
  export const initialState: ContactsState = {
    contacts: [],
    error: null
  };
  
  export const contactsReducer = createReducer(
    initialState,
    on(loadContactsSuccess, (state, { contacts }) => ({ ...state, contacts })),
    on(loadContactsFailure, (state, { error }) => ({ ...state, error })),
    on(createContactSuccess, (state, { contact }) => ({ ...state, contacts: [...state.contacts, contact] })),
    on(createContactFailure, (state, { error }) => ({ ...state, error })),
    on(updateContactSuccess, (state, { contact }) => ({
      ...state,
      contacts: state.contacts.map(c => c.id === contact.id ? contact : c)
    })),
    on(updateContactFailure, (state, { error }) => ({ ...state, error })),
    on(deleteContactSuccess, (state, { contactId }) => ({
      ...state,
      contacts: state.contacts.filter(contact => contact.id !== contactId)
    })),
    on(deleteContactFailure, (state, { error }) => ({ ...state, error }))
  );