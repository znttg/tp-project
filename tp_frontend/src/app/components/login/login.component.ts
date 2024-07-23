import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import * as AuthActions from '../../auth/auth.actions';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthState } from '../../auth/auth.reducer';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  providers: [Store],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  error$: Observable<string | null>;

  private formBuilder = inject(FormBuilder)
  private store = inject(Store<AuthState>)

  constructor() {
    this.error$ = this.store.select(state => state.auth.error);
  }

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  onSubmit() {
    const credentials = this.loginForm.value as { email: string; password: string };
    this.store.dispatch(AuthActions.login(credentials));
  }
}
