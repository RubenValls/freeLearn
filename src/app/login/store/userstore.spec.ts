import { UserActions } from './user.actions';
import { Actions } from '@ngrx/effects';
import { TestScheduler } from 'rxjs/testing';
import { userReducer, initialState } from './user.reducer';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TestBed } from '@angular/core/testing';
import { selectUser } from './user.selectors';

describe('UserActions', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should create the Add User action', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const action = UserActions.addUser;
      const source = cold('a', { a: action });
      const actions = new Actions(source);

      expectObservable(actions).toBe('a', { a: action });
    });
  });

  it('should create the Update User action', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const action = UserActions.updateUser;
      const source = cold('a', { a: action });
      const actions = new Actions(source);

      expectObservable(actions).toBe('a', { a: action });
    });
  });
});

describe('UserReducer', () => {
  it('should return the initial state', () => {
    const action = {} as any;
    const state = userReducer(initialState, action);

    expect(state).toBe(initialState);
  });

  it('should add a user', () => {
    const user = { id: 1, name: 'Test User' };
    const action = UserActions.addUser({ user });
    const state = userReducer(initialState, action);

    expect(state).toEqual(user);
  });

  it('should update a user', () => {
    const user = { id: 1, name: 'Updated User' };
    const action = UserActions.updateUser({ user });
    const state = userReducer(initialState, action);

    expect(state).toEqual(user);
  });
});

describe('UserSelectors', () => {
  let store: MockStore;
  const initialState = { user: { id: 1, name: 'Test User' } };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({ initialState }),
      ],
    });

    store = TestBed.inject(MockStore);
  });

  it('should select the user state', () => {
    const selector = store.select(selectUser);

    selector.subscribe(state => {
      expect(state).toEqual(initialState.user);
    });
  });
});




