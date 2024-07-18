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
      { id: 1, name: 'Client 1', relationshipStart: new Date(), addressCity: 'City 1', addressPostalCode: '11111', addressStreet: 'Street 1', addressApt: 'Apt 1', activityType: 1, infoEmail: 'client1@example.com' },
      { id: 2, name: 'Client 2', relationshipStart: new Date(), addressCity: 'City 2', addressPostalCode: '22222', addressStreet: 'Street 2', addressApt: 'Apt 2', activityType: 2, infoEmail: 'client2@example.com' }
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
