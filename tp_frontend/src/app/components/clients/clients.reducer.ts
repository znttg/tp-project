import { createReducer, on } from '@ngrx/store';
import * as ClientsActions from './clients.actions';
import { Client } from '../../models/client';
import { updateClientFailure, updateClientSuccess } from './clients.actions';

export interface ClientsState {
  clients: Client[];
  error: any;
}

export const initialState: ClientsState = {
  clients: [],
  error: null
};

export const clientsReducer = createReducer(
  initialState,
  on(ClientsActions.loadClientsSuccess, (state, { clients }) => ({ ...state, clients, error: null })),
  on(ClientsActions.loadClientsFailure, (state, { error }) => ({ ...state, error })),
  on(ClientsActions.addClientSuccess, (state, { client }) => ({ ...state, clients: [...state.clients, client] })),
  on(ClientsActions.addClientFailure, (state, { error }) => ({ ...state, error })),
  on(updateClientSuccess, (state, { client }) => ({ ...state, clients: state.clients.map(c => c.id === client.id ? client : c) })),
  on(updateClientFailure, (state, { error }) => ({ ...state, error })), 
  on(ClientsActions.deleteClientSuccess, (state, { clientId }) => ({ ...state, clients: state.clients.filter(client => client.id !== clientId) })),
  on(ClientsActions.deleteClientFailure, (state, { error }) => ({ ...state, error }))
);
