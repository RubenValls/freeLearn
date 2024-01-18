import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth'
import { environment } from 'src/environments/environment';
import { Store, StoreModule } from '@ngrx/store';
import { TechnologiesEffects } from './technologies.effects';
import { TechService } from 'src/app/admins/admins-dashboard/pages/technologies/service/tech.service';
import { technologiesReducer } from './technologies.reducer';
import { TechnologyType } from 'src/app/admins/admins-dashboard/pages/technologies/types/technologies';
import { TechnologiesActions } from './technologies.actions';
import { selectTechnologies } from './tecnologies.selectors';



describe('Technologies Store', () => {
  let actions$: Observable<any>;
  let effects: TechnologiesEffects;
  let technologiesService: TechService;
  let httpMock: HttpTestingController;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        provideFirestore(() => getFirestore()),
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAuth(() => getAuth()), 
        StoreModule.forRoot({ technologies: technologiesReducer }),
    ],
      providers: [
        TechnologiesEffects,
        provideMockActions(() => actions$),
        TechService
      ]
    });

    effects = TestBed.inject(TechnologiesEffects);
    technologiesService = TestBed.inject(TechService);
    httpMock = TestBed.inject(HttpTestingController);
    store = TestBed.inject(Store);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should create a retrievedTechnologiesList action', () => {
    const technologies: ReadonlyArray<TechnologyType> = [];
    const action = TechnologiesActions.retrievedTechnologiesList({ technologies });

    expect(action).toEqual({
      type: "[Technologies] Retrieved Technologies List",
      technologies,
    });
  });

  it('should return the technologies list when retrievedTechnologiesList action is dispatched', () => {
    const technologies: ReadonlyArray<TechnologyType> = [];
    const action = TechnologiesActions.retrievedTechnologiesList({ technologies });
    const state = technologiesReducer(technologies, action);

    expect(state).toEqual(technologies);
  });

  it('should return the initial state when an unrelated action is dispatched', () => {
    const initialState: ReadonlyArray<TechnologyType> = [];
    const action = { type: 'UNRELATED_ACTION' };
    const state = technologiesReducer(initialState, action);

    expect(state).toEqual(initialState);
  });

  it('should select the technologies from the store', () => {
    const technologies: ReadonlyArray<TechnologyType> = [];

    store.dispatch(TechnologiesActions.retrievedTechnologiesList({ technologies }));

    store.select(selectTechnologies).subscribe((state) => {
      expect(state).toEqual(technologies);
    });
  });
});

  
