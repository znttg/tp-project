import { createAction, props } from '@ngrx/store';

export const login = createAction('[Auth] Login', props<{ email: string; password: string }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ token: string }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: any }>());
export const logout = createAction('[Auth] Logout');

export const signUp = createAction('[Auth] Sign Up', props<{ name: string; email: string; password: string;}>());
export const signUpSuccess = createAction('[Auth] Sign Up Success', props<{ token: string }>());
export const signUpFailure = createAction('[Auth] Sign Up Failure', props<{ error: any }>());

export const loadAuthFromLocalStorage = createAction('[Auth] Load Auth From LocalStorage');