import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Data } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderCourseComponent } from './header-course.component';
import { of } from 'rxjs';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth'
import { environment } from 'src/environments/environment';
import { StudentsModule } from 'src/app/students/students.module';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';

describe('HeaderCourseComponent', () => {
  let component: HeaderCourseComponent;
  let fixture: ComponentFixture<HeaderCourseComponent>;
  let userService: UsersService;
  let alertService: AlertsService;
  let route: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderCourseComponent], 
      imports: [
        StudentsModule,
        RouterTestingModule,
        provideFirestore(() => getFirestore()),
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAuth(() => getAuth()), ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 'test' }),
            data: of({ data: { id: 'test' } })
            
          }
        },
        { provide: UsersService, useValue: { 
          getUserFromStorage: () => { },
        } }
      ]
    });
    fixture = TestBed.createComponent(HeaderCourseComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UsersService);
    alertService = TestBed.inject(AlertsService);
    route = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with user data and course id', () => {
    spyOn(userService, 'getUserFromStorage').and.returnValue({id: 'test', favorites: ['test']});
    spyOn(route.params, 'subscribe');
    component.ngOnInit();
    expect(component.userId).toBe('test');
    expect(component.isFavorite).toBeTrue();
  });

});