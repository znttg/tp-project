import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ClientsActions from './clients.actions';
import { ClientsService } from '../../services/clients/clients.service';
import { updateClient, updateClientFailure, updateClientSuccess } from './clients.actions';

@Injectable()
export class ClientsEffects {

  private actions$ = inject(Actions);
  private clientsService = inject(ClientsService);

  loadClients$ = createEffect(() => this.actions$.pipe(
    ofType(ClientsActions.loadClients),
    mergeMap(() =>
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

  updateClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateClient),
      mergeMap((action) =>
        this.clientsService.updateClient(action.clientId, action.client).pipe(
          map((client) => updateClientSuccess({ client })),
          catchError((error) => of(updateClientFailure({ error })))
        )
      )
    )
  );

  deleteClient$ = createEffect(() => this.actions$.pipe(
    ofType(ClientsActions.deleteClient),
    mergeMap(({ clientId }) =>
      this.clientsService.deleteClient(clientId).pipe(
        map(() => ClientsActions.deleteClientSuccess({ clientId })),
        catchError(error => of(ClientsActions.deleteClientFailure({ error })))
      )
    )
  ));
}
