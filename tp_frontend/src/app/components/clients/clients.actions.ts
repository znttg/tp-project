import { createAction, props } from '@ngrx/store';
import { Client } from '../../models/client';

export const loadClients = createAction('[Clients] Load Clients');
export const loadClientsSuccess = createAction('[Clients] Load Clients Success', props<{ clients: Client[] }>());
export const loadClientsFailure = createAction('[Clients] Load Clients Failure', props<{ error: any }>());
export const loadClient = createAction('[Clients] Load Client', props<{ clientId: number }>())
export const addClient = createAction('[Clients] Add Client', props<{ client: Client }>());
export const addClientSuccess = createAction('[Clients] Add Client Success', props<{ client: Client }>());
export const addClientFailure = createAction('[Clients] Add Client Failure', props<{ error: any }>());

export const updateClient = createAction('[Client] Update Client', props<{ clientId: number, client: Client }>());
export const updateClientSuccess = createAction('[Client] Update Client Success', props<{ client: Client }>());
export const updateClientFailure = createAction('[Client] Update Client Failure', props<{ error: string }>());

export const deleteClient = createAction('[Clients] Delete Client', props<{ clientId: number }>());
export const deleteClientSuccess = createAction('[Clients] Delete Client Success', props<{ clientId: number }>());
export const deleteClientFailure = createAction('[Clients] Delete Client Failure', props<{ error: any }>());
