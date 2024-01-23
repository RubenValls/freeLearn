import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth'
import { environment } from 'src/environments/environment';
import { Store, StoreModule } from '@ngrx/store';
import { InstructorsEffects } from './instructors.effects';
import { InstructorsService } from 'src/app/admins/admins-dashboard/pages/instructors/instructors-service/instructors.service';
import { instructorsReducer } from './instructors.reducer';
import { Instructor } from 'src/app/admins/admins-dashboard/pages/instructors/instructors';
import { InstructorsActions } from './instructors.actions';
import { selectInstructor } from './instructors.selectors';



describe('Instructors Store', () => {
  let actions$: Observable<any>;
  let effects: InstructorsEffects;
  let instructorsService: InstructorsService;
  let httpMock: HttpTestingController;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        provideFirestore(() => getFirestore()),
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAuth(() => getAuth()), 
        StoreModule.forRoot({ instructors: instructorsReducer }),
    ],
      providers: [
        InstructorsEffects,
        provideMockActions(() => actions$),
        InstructorsService
      ]
    });

    effects = TestBed.inject(InstructorsEffects);
    instructorsService = TestBed.inject(InstructorsService);
    httpMock = TestBed.inject(HttpTestingController);
    store = TestBed.inject(Store);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should create a retrievedInstructorsList action', () => {
    const instructors: ReadonlyArray<Instructor> = [];
    const action = InstructorsActions.retrievedInstructorsList({ instructors });

    expect(action).toEqual({
      type: "[Intructors] Retrieved Instructors List",
      instructors,
    });
  });

  it('should return the instructors list when retrievedInstructorsList action is dispatched', () => {
    const instructors: ReadonlyArray<Instructor> = [];
    const action = InstructorsActions.retrievedInstructorsList({ instructors });
    const state = instructorsReducer(instructors, action);

    expect(state).toEqual(instructors);
  });

  it('should return the initial state when an unrelated action is dispatched', () => {
    const initialState: ReadonlyArray<Instructor> = [];
    const action = { type: 'UNRELATED_ACTION' };
    const state = instructorsReducer(initialState, action);

    expect(state).toEqual(initialState);
  });

  it('should select the instructors from the store', () => {
    const instructors: ReadonlyArray<Instructor> = [];

    store.dispatch(InstructorsActions.retrievedInstructorsList({ instructors }));

    store.select(selectInstructor).subscribe((state) => {
      expect(state).toEqual(instructors);
    });
  });
});

  
