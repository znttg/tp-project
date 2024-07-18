import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { isLoggedIn } from '../../auth/auth.selectors';
import { CommonModule } from '@angular/common';
import * as AuthActions from '../../auth/auth.actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  private store = inject(Store<AppState>);
  isAuthenticated$ = this.store.pipe(select(isLoggedIn));

  onLogout() {
    this.store.dispatch(AuthActions.logout());
  }
}
