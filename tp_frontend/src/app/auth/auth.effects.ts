import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from '../auth/auth.actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import * as ClientsActions from '../components/clients/clients.actions';

@Injectable()
export class AuthEffects {

  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router)

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(action =>
        this.authService.signIn(action)
        .pipe(
          tap((response: any) => { 
            localStorage.setItem('token', response.status.token);
          }),
          map(token => AuthActions.loginSuccess({ token })),
          catchError(error => of(AuthActions.loginFailure({ error }))),
        )
      )
    )
  );

  loginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.loginSuccess),
    tap(() => {
      this.router.navigate(['/clients']);
    }),
    map(() => ClientsActions.loadClients())
  ))

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUp),
      mergeMap(action =>
        this.authService.signUp(action).pipe(
          map(token => AuthActions.signUpSuccess({ token })),
          catchError(error => of(AuthActions.signUpFailure({ error })))
        )
      )
    )
  );

  loadUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadUserProfile),
      mergeMap(() =>
        this.authService.getUserProfile().pipe(
          map(user => AuthActions.loadUserProfileSuccess({ user })),
          catchError(error => of(AuthActions.loadUserProfileFailure({ error })))
        )
      )
    )
  );

  
}
