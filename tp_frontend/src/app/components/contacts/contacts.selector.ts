import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ContactsState } from './contacts.reducer';

export const selectContactsState = createFeatureSelector<ContactsState>('contacts');

export const selectContacts = createSelector(
  selectContactsState,
  (state: ContactsState) => state.contacts
);

export const getContactsError = createSelector(
  selectContactsState,
  (state: ContactsState) => state.error
);