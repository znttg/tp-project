import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from '../auth/auth.reducer';

import { clientsReducer, ClientsState } from '../components/clients/clients.reducer';

export interface AppState {
  auth: AuthState;
  clients: ClientsState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  clients: clientsReducer
};
