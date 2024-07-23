import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from '../auth/auth.reducer';

import { clientsReducer, ClientsState } from '../components/clients/clients.reducer';
import { contactsReducer, ContactsState } from '../components/contacts/contacts.reducer';

export interface AppState {
  auth: AuthState;
  clients: ClientsState;
  contacts: ContactsState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  clients: clientsReducer,
  contacts: contactsReducer,
};
