import { Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ClientsComponent } from './components/clients/clients.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'signup', component: SignupComponent},
    { path: 'login', component: LoginComponent },
    { path: 'home', component: ClientsComponent },
];
