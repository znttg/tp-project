import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ClientsComponent } from './components/clients/clients.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'clients', component: ClientsComponent, canActivate: [AuthGuard] }
];
