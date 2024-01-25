import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth'
import { environment } from 'src/environments/environment';
import { Store, StoreModule } from '@ngrx/store';
import { UsersEffects } from './users.effects';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { usersReducer } from './users.reducer';
import { User } from 'src/app/login/types/user';
import { UsersActions } from './users.actions';
import { selectUsers } from './users.selectors';




describe('Users Store', () => {
  let actions$: Observable<any>;
  let effects: UsersEffects;
  let usersService: UsersService;
  let httpMock: HttpTestingController;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        provideFirestore(() => getFirestore()),
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAuth(() => getAuth()), 
        StoreModule.forRoot({ users: usersReducer }),
    ],
      providers: [
        UsersEffects,
        provideMockActions(() => actions$),
        UsersService
      ]
    });

    effects = TestBed.inject(UsersEffects);
    usersService = TestBed.inject(UsersService);
    httpMock = TestBed.inject(HttpTestingController);
    store = TestBed.inject(Store);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should create a retrievedUsersList action', () => {
    const users: ReadonlyArray<User> = [];
    const action = UsersActions.retrievedUsersList({ users });

    expect(action).toEqual({
      type: "[Users] Retrieved Users List",
      users,
    });
  });

  it('should return the users list when retrievedUsersList action is dispatched', () => {
    const users: ReadonlyArray<User> = [];
    const action = UsersActions.retrievedUsersList({ users });
    const state = usersReducer(users, action);

    expect(state).toEqual(users);
  });

  it('should return the initial state when an unrelated action is dispatched', () => {
    const initialState: ReadonlyArray<User> = [];
    const action = { type: 'UNRELATED_ACTION' };
    const state = usersReducer(initialState, action);

    expect(state).toEqual(initialState);
  });

  it('should select the users from the store', () => {
    const users: ReadonlyArray<User> = [];

    store.dispatch(UsersActions.retrievedUsersList({ users }));

    store.select(selectUsers).subscribe((state) => {
      expect(state).toEqual(users);
    });
  });
});

  
