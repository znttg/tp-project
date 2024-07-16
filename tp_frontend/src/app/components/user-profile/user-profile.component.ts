import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from './../../actions/auth.actions';
import { AuthState } from './../../reducers/auth.reducer';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {

  private store = inject(Store<AuthState>)

  user$ = this.store.select(state => state.auth.user);

  ngOnInit(): void {
    this.store.dispatch(AuthActions.loadUserProfile());
  }
}
