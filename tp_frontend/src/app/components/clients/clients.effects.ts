import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as ClientsActions from './clients.actions';
import { ClientsService } from '../../services/clients/clients.service';

@Injectable()
export class ClientsEffects {

  loadClients$ = createEffect(() => this.actions$.pipe(
    ofType(ClientsActions.loadClients),
    switchMap(() =>
      this.clientsService.fetchClients().pipe(
        map(clients => ClientsActions.loadClientsSuccess({ clients })),
        catchError(error => of(ClientsActions.loadClientsFailure({ error })))
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private clientsService: ClientsService
  ) {}
}
