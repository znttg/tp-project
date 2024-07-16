import { createAction, props } from '@ngrx/store';

export const login = createAction('[Auth] Login', props<{ email: string; password: string }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ user: any }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: any }>());

export const signUp = createAction('[Auth] Sign Up', props<{ email: string; password: string; password_confirmation: string }>());
export const signUpSuccess = createAction('[Auth] Sign Up Success', props<{ user: any }>());
export const signUpFailure = createAction('[Auth] Sign Up Failure', props<{ error: any }>());

export const loadUserProfile = createAction('[Auth] Load User Profile');
export const loadUserProfileSuccess = createAction('[Auth] Load User Profile Success', props<{ user: any }>());
export const loadUserProfileFailure = createAction('[Auth] Load User Profile Failure', props<{ error: any }>());