import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const isLoggedIn = createSelector(
  selectAuthState,
  (auth) => auth.loggedIn,
);

export const selectToken = createSelector(
  selectAuthState,
  (auth) => auth.token
);

export const selectError = createSelector(
  selectAuthState,
  (auth) => auth.error
);
