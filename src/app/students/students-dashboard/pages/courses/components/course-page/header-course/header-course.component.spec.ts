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

describe('HeaderCourseComponent', () => {
  let component: HeaderCourseComponent;
  let fixture: ComponentFixture<HeaderCourseComponent>;

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
        }
      ]
    });
    fixture = TestBed.createComponent(HeaderCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
