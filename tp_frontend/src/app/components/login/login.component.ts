import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import * as AuthActions from './../../actions/auth.actions';
import { AuthState } from './../../reducers/auth.reducer';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  providers: [Store],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;

  private formBuilder = inject(FormBuilder)
  private store = inject(Store<AuthState>)

  onInit() {
      this.loginForm = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  onSubmit() {
    const credentials = this.loginForm.value;
    this.store.dispatch(AuthActions.login(credentials));
  }
}
