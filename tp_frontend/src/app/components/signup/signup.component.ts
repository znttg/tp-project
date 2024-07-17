import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControlOptions, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import * as AuthActions from '../../actions/auth.actions';
import { Store } from '@ngrx/store';
import { AuthState } from '../../reducers/auth.reducer';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  providers: [Store],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  private store = inject(Store<AuthState>)
  private formBuilder = inject(FormBuilder)
  
  signUpForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    passwordConfirmation: ['', [Validators.required]]
  }, {
    validator: this.passwordMatchValidator
  } as FormControlOptions);

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')!.value === form.get('passwordConfirmation')!.value
      ? null : { 'mismatch': true };
  }

  onSubmit() {
    const user = this.signUpForm.value as { name: string; email: string; password: string };;
    this.store.dispatch(AuthActions.signUp(user));
  }

}

