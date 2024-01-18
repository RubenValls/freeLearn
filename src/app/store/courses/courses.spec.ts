import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { CoursesEffects } from './courses.effects';
import { CoursesService } from 'src/app/admins/admins-dashboard/pages/courses/service/courses.service';
import { Course } from 'src/app/admins/admins-dashboard/pages/courses/interface/course';
import { CoursesActions } from './courses.actions';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth'
import { environment } from 'src/environments/environment';
import { coursesReducer } from './courses.reducer';
import { Store, StoreModule } from '@ngrx/store';
import { selectCourses } from './courses.selectors';


describe('Courses Store', () => {
  let actions$: Observable<any>;
  let effects: CoursesEffects;
  let coursesService: CoursesService;
  let httpMock: HttpTestingController;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        provideFirestore(() => getFirestore()),
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAuth(() => getAuth()), 
        StoreModule.forRoot({ courses: coursesReducer }),
    ],
      providers: [
        CoursesEffects,
        provideMockActions(() => actions$),
        CoursesService
      ]
    });

    effects = TestBed.inject(CoursesEffects);
    coursesService = TestBed.inject(CoursesService);
    httpMock = TestBed.inject(HttpTestingController);
    store = TestBed.inject(Store);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should create a Retrieved Courses List action', () => {
    const courses: ReadonlyArray<Course> = [];
    const action = CoursesActions.retrievedCoursesList({ courses });

    expect(action).toEqual({
      type: '[Courses] Retrieved Courses List',
      courses,
    });
  });

  it('should return the courses list when retrievedCoursesList action is dispatched', () => {
    const courses: ReadonlyArray<Course> = [];
    const action = CoursesActions.retrievedCoursesList({ courses });
    const state = coursesReducer(courses, action);

    expect(state).toEqual(courses);
  });

  it('should return the initial state when an unrelated action is dispatched', () => {
    const initialState: ReadonlyArray<Course> = [];
    const action = { type: 'UNRELATED_ACTION' };
    const state = coursesReducer([], action);

    expect(state).toEqual(initialState);
  });

  it('should select the courses from the store', () => {
    const courses: ReadonlyArray<Course> = [];

    store.dispatch(CoursesActions.retrievedCoursesList({ courses }));

    store.select(selectCourses).subscribe((state) => {
      expect(state).toEqual(courses);
    });
  });
});

  
