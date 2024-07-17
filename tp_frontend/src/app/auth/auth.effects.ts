import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from '../auth/auth.actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthEffects {

  private actions$ = inject(Actions);
  private authService = inject(AuthService);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(action =>
        this.authService.login(action)
        .pipe(
          tap((response: any) => {
            localStorage.setItem('token', response.status.token)
          }),
          map(token => AuthActions.loginSuccess({ token })),
          catchError(error => of(AuthActions.loginFailure({ error }))),
        )
      )
    )
  );

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
