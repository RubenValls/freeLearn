import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Data } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CoursePageComponent } from './course-page.component';
import { StudentsModule } from 'src/app/students/students.module';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth'
import { environment } from 'src/environments/environment';
import { CoursesService } from 'src/app/admins/admins-dashboard/pages/courses/service/courses.service';
import { UsersService } from 'src/app/shared/services/users/users.service';


describe('CoursePageComponent', () => {
  let component: CoursePageComponent;
  let fixture: ComponentFixture<CoursePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, 
        StudentsModule,
        provideFirestore(() => getFirestore()),
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAuth(() => getAuth()), 
      
      ],
      declarations: [CoursePageComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 'test' }),
            data: of({ data: { id: 'test' } })
          }
        },
        {provide : UsersService, useValue: {getUserFromStorage:  () => of([])}},
      ]
    });
    fixture = TestBed.createComponent(CoursePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize course ID correctly', () => {
    expect(component.courseId).toEqual('test');
  });

  it('should initialize instructors ID correctly', () => {
    expect(component.instructorsId).toBeUndefined();
  });

  it('should initialize techs ID correctly', () => {
    expect(component.techsId).toBeUndefined();
  });

  it('should initialize lessons visibility correctly', () => {
    expect(component.areLessonsVisible).toEqual(false);
  });

  it('should update course rating correctly', () => {
    const spy = spyOn(component, 'handleUpdate');
    component.handleUpdate(5);
    expect(spy).toHaveBeenCalled();
  });  

});
