import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './../actions/auth.actions';

export interface AuthState {
  user: any;
  error: any;
  loading: boolean;
}

export const initialState: AuthState = {
  user: null,
  error: null,
  loading: false,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, AuthActions.signUp, state => ({ ...state, loading: true })),
  on(AuthActions.loginSuccess, AuthActions.signUpSuccess, (state, { user }) => ({ ...state, user, loading: false })),
  on(AuthActions.loginFailure, AuthActions.signUpFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(AuthActions.loadUserProfile, state => ({ ...state, loading: true })),
  on(AuthActions.loadUserProfileSuccess, (state, { user }) => ({ ...state, user, loading: false })),
  on(AuthActions.loadUserProfileFailure, (state, { error }) => ({ ...state, error, loading: false })),
);
