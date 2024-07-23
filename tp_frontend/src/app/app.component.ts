import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { AppState } from './store/app.state';
import { Store } from '@ngrx/store';
import * as AuthActions from './auth/auth.actions';
import { ClientsComponent } from './components/clients/clients.component';
import { ModalComponent } from './components/modal/modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    ClientsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  private store = inject(Store<AppState>)

  ngOnInit() {
    this.store.dispatch(AuthActions.loadAuthFromLocalStorage());
  }

  title = 'tp_frontend';
}
