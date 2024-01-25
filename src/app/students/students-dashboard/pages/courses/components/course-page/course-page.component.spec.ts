import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
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
        {provide : UsersService, useValue: {getUserFromStorage:  () => of({id: 'user123'})}},
        {provide : CoursesService, useValue: {updateCourseRating:  () => Promise.resolve({rating: 4})}},
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

  it('should update course rating correctly', async () => {
    spyOn(component.courseService, 'updateCourseRating').and.returnValue(Promise.resolve({
      id: '1',
      name: 'Angular Basics',
      description: 'This course covers the basics of Angular.',
      instructorId: [
          {
              id: 'ins1',
              name: 'John Doe'
          }
      ],
      imageUrl: 'https://example.com/angular-basics.jpg',
      techs: [
          {
              id: 'tech1',
              name: 'Angular'
          },
          {
              id: 'tech2',
              name: 'TypeScript'
          }
      ],
      lessons: [
          {
              id: 'lesson1',
              name: 'Introduction to Angular',
              videoUrl: 'https://example.com/intro-to-angular.mp4'
          },
          {
              id: 'lesson2',
              name: 'Components and Modules',
              videoUrl: 'https://example.com/components-and-modules.mp4'
          }
      ],
      rating: [
          {
              userId: 'user1',
              rating: 5
          },
          {
              userId: 'user2',
              rating: 4
          }
      ],
      introductionURL: 'https://example.com/intro-to-angular-course'
    }));

    const spy = spyOn(component, 'handleUpdate').and.callThrough();
    component.handleUpdate(5);
    
    expect(spy).toHaveBeenCalledWith(5);
    await fixture.whenStable();
    expect(component.course).toBeDefined();
  });  

  
});
