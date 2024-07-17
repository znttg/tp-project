import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from '../auth/auth.reducer';

// import { clientReducer, ClientState } from '../clients/client.reducer';

export interface AppState {
  auth: AuthState;
//   clients: ClientState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  // clients: clientReducer
};
