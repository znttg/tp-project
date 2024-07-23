import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../auth/auth.actions';

export interface AuthState {
  loggedIn: boolean;
  token: string | null;
  error: any | null;
}

export const initialState: AuthState = {
  loggedIn: false,
  token: null,
  error: null
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { token }) => ({ ...state, loggedIn: true, token, error: null})),
  on(AuthActions.loginFailure, (state, { error }) => ({ ...state, loggedIn: false, token: null, error: 'Incorrect Email or Password.'})),
  on(AuthActions.logout, (state) => ({ ...state, loggedIn: false, token: null, error: null}))
);
