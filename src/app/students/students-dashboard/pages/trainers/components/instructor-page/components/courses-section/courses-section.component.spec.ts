import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesSectionComponent } from './courses-section.component';
import { StudentsModule } from 'src/app/students/students.module';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth'
import { environment } from 'src/environments/environment';
import { CoursesService } from 'src/app/admins/admins-dashboard/pages/courses/service/courses.service';
import { of } from 'rxjs';

describe('CoursesSectionComponent', () => {
  let component: CoursesSectionComponent;
  let fixture: ComponentFixture<CoursesSectionComponent>;
  let coursesService: CoursesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesSectionComponent],
      imports: [
        StudentsModule,
        provideFirestore(() => getFirestore()),
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAuth(() => getAuth()),
      ],
      providers: [
        { provide: CoursesService, useValue: { getInstructorCourses: () => of([]) } }
      ]
    });
    fixture = TestBed.createComponent(CoursesSectionComponent);
    component = fixture.componentInstance;
    coursesService = TestBed.inject(CoursesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getInstructorCourses on ngOnInit if courses are defined', () => {
    spyOn(coursesService, 'getTopicCourses').and.callThrough();
    component.courses = ['course1', 'course2'];
    component.ngOnInit();
    expect(coursesService.getTopicCourses).toHaveBeenCalledWith(component.courses);
  });

  it('should not call getTopicCourses on ngOnInit if courses are undefined', () => {
    spyOn(coursesService, 'getTopicCourses').and.callThrough();
    component.courses = undefined;
    component.ngOnInit();
    expect(coursesService.getTopicCourses).not.toHaveBeenCalled();
  });
});
