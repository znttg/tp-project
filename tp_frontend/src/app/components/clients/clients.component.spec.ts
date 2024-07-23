import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ClientsComponent } from './clients.component';
import { selectAllClients } from './clients.selectors';
import { Client } from '../../models/client';
import { loadClients } from './clients.actions';
import { MemoizedSelector, DefaultProjectorFn } from '@ngrx/store';

describe('ClientsComponent', () => {
  let component: ClientsComponent;
  let fixture: ComponentFixture<ClientsComponent>;
  let store: MockStore;
  let mockClientsSelector: MemoizedSelector<any, Client[], DefaultProjectorFn<Client[]>>;
  
  const initialState = { clients: { clients: [], error: null } };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientsComponent],
      providers: [
        provideMockStore({ initialState })
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    mockClientsSelector = store.overrideSelector(selectAllClients, []);

    fixture = TestBed.createComponent(ClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadClients on init', () => {
    const spy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith(loadClients());
  });

  it('should display the list of clients', () => {
    const mockClients: Client[] = [
      { id: 1, name: 'Client 1', relationship_start: new Date(), address_city: 'City 1', address_postal_code: '11111', address_street: 'Street 1', address_apt: 'Apt 1', activity_type: 1, info_email: 'client1@example.com' },
      { id: 2, name: 'Client 2', relationship_start: new Date(), address_city: 'City 2', address_postal_code: '22222', address_street: 'Street 2', address_apt: 'Apt 2', activity_type: 2, info_email: 'client2@example.com' }
    ];

    mockClientsSelector.setResult(mockClients);
    store.refreshState();
    fixture.detectChanges();

    const clientElements = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(clientElements.length).toBe(2);
    expect(clientElements[0].textContent).toContain('Client 1');
    expect(clientElements[1].textContent).toContain('Client 2');
  });
});
