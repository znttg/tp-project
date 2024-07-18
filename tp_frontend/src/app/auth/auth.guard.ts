import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { isLoggedIn } from './auth.selectors';
import * as ClientsActions from '../components/clients/clients.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  private store = inject(Store<AppState>);
  private router = inject(Router);
  
  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(isLoggedIn),
      tap((loggedIn) => {
        if (loggedIn) {
          this.store.dispatch(ClientsActions.loadClients());
        } else {
          this.router.navigate(['/login']);
        }
      })
    );
  }
}