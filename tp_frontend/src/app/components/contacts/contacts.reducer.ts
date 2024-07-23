import { createReducer, on, Action } from '@ngrx/store';
import * as ContactActions from './../contacts/contacts.actions';
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
  on(ContactActions.loadContactsSuccess, (state, { contacts }) => ({
    ...state,
    contacts,
    error: null
  })),
  on(ContactActions.loadContactsFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(ContactActions.createContactSuccess, (state, { contact }) => ({
    ...state,
    contacts: [...state.contacts, contact],
    error: null
  })),
  on(ContactActions.createContactFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(ContactActions.updateContactSuccess, (state, { contact }) => ({
    ...state,
    contacts: state.contacts.map(c => c.id === contact.id ? contact : c),
    error: null
  })),
  on(ContactActions.updateContactFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(ContactActions.deleteContactSuccess, (state, { contactId }) => ({
    ...state,
    contacts: state.contacts.filter(contact => contact.id !== contactId),
    error: null
  })),
  on(ContactActions.deleteContactFailure, (state, { error }) => ({
    ...state,
    error
  }))
  );