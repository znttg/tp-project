import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from '../auth/auth.actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import * as ClientsActions from '../components/clients/clients.actions';
import { isLocalStorageAvailable } from '../utils/local-storage.util';


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
          map((response: any) => {
            const token = response.status.token;
            if(isLocalStorageAvailable()) 
              localStorage.setItem('token', token);
            return AuthActions.loginSuccess({ token });
          }), 
          catchError(error => of(AuthActions.loginFailure({ error }))),
        )
      )
    )
  );

  loginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.loginSuccess),
    tap(({ token }) => {
      if(isLocalStorageAvailable())
        localStorage.setItem('token', token);
      this.router.navigate(['/clients']);
    }),
    map(() => ClientsActions.loadClients())
  ))

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.logout),
    tap(() => {
      if(isLocalStorageAvailable())
        localStorage.removeItem('token');
      this.router.navigate(['/']);
    })
  ), { dispatch: false });

  loadAuthFromLocalStorage$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.loadAuthFromLocalStorage),
    map(() => {
      let token = null;
      if(isLocalStorageAvailable())
        token = localStorage.getItem('token');
      if (token) {
        return AuthActions.loginSuccess({ token });
      } else {
        return AuthActions.logout();
      }
    })
  ));

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
}
