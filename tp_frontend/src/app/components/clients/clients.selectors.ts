import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClientsState } from './clients.reducer';

export const selectClientsState = createFeatureSelector<ClientsState>('clients');

export const selectAllClients = createSelector(
  selectClientsState,
  (state: ClientsState) => state.clients
);

export const getClientsError = createSelector(
  selectClientsState,
  (state: ClientsState) => state.error
);