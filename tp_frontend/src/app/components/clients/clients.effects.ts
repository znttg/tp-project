import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as ClientsActions from './clients.actions';
import { ClientsService } from '../../services/clients/clients.service';

@Injectable()
export class ClientsEffects {

  loadClients$ = createEffect(() => this.actions$.pipe(
    ofType(ClientsActions.loadClients),
    switchMap(() =>
      this.clientsService.getClients().pipe(
        map(clients => ClientsActions.loadClientsSuccess({ clients })),
        catchError(error => of(ClientsActions.loadClientsFailure({ error })))
      )
    )
  ));

  addClient$ = createEffect(() => this.actions$.pipe(
    ofType(ClientsActions.addClient),
    mergeMap(({ client }) =>
      this.clientsService.addClient(client).pipe(
        map(newClient => ClientsActions.addClientSuccess({ client: newClient })),
        catchError(error => of(ClientsActions.addClientFailure({ error })))
      )
    )
  ));

  deleteClient$ = createEffect(() => this.actions$.pipe(
    ofType(ClientsActions.deleteClient),
    mergeMap(({ clientId }) =>
      this.clientsService.deleteClient(clientId).pipe(
        map(() => ClientsActions.deleteClientSuccess({ clientId })),
        catchError(error => of(ClientsActions.deleteClientFailure({ error })))
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private clientsService: ClientsService
  ) {}
}
