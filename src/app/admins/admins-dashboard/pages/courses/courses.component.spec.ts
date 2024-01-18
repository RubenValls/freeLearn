import { MatIconModule } from '@angular/material/icon';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CoursesComponent } from './courses.component';
import { Store, StoreModule } from '@ngrx/store';
import { coursesReducer } from 'src/app/store/courses/courses.reducer';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth'
import { environment } from 'src/environments/environment';
import { AdminsModule } from 'src/app/admins/admins.module';
import { CoursesService } from './service/courses.service';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let store: Store;
  let coursesService: jasmine.SpyObj<CoursesService>;
  let alertsService: jasmine.SpyObj<AlertsService>;

  beforeEach(async () => {
    const coursesServiceSpy = jasmine.createSpyObj('CoursesService', ['updateCourse', 'deleteCourse', 'getCourseById']);
    const alertsServiceSpy = jasmine.createSpyObj('AlertsService', ['successMessage', 'errorMessage']);

    coursesServiceSpy.updateCourse.and.returnValue(Promise.resolve());

    await TestBed.configureTestingModule({
      declarations: [ CoursesComponent ],
      imports: [ 
        AdminsModule,
        StoreModule.forRoot({ courses: coursesReducer }),
        provideFirestore(() => getFirestore()),
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAuth(() => getAuth()),
      ],
      providers: [ 
        Store,
        { provide: CoursesService, useValue: coursesServiceSpy },
        { provide: AlertsService, useValue: alertsServiceSpy } 
      ]
    })
    .compileComponents();
    coursesService = TestBed.inject(CoursesService) as jasmine.SpyObj<CoursesService>;
    alertsService = TestBed.inject(AlertsService) as jasmine.SpyObj<AlertsService>;
    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have all variables defined', () => {
    expect(component.watchForm).toBeDefined();
    expect(component.courses$).toBeDefined();
    expect(component.modalWith).toBeDefined();
    expect(component.modalHeight).toBeDefined();
    expect(component.modalTitle).toBeDefined();
    expect(component.tableColumns).toBeDefined();
    expect(component.rows).toBeDefined();
  });

  it('should toggle watchForm on addCourse', () => {
    component.watchForm = false;
    component.addCourse();
    expect(component.watchForm).toBe(true);
    component.addCourse();
    expect(component.watchForm).toBe(false);
  });

  it('should add a course', () => {
    component.addCourse();
    expect(component.watchForm).toBeTrue();
  });

  it('should edit a course', () => {
    const testCourse = {
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
    };
    coursesService.updateCourse.and.returnValue(Promise.resolve());
    component.onEdit(testCourse);
    expect(coursesService.updateCourse.calls.count()).toBe(1, 'one call');
    expect(coursesService.updateCourse.calls.first().args[0]).toBe(testCourse.id, 'course id');
    expect(coursesService.updateCourse.calls.first().args[1]).toBe(testCourse, 'course object');
  });
  
  it('should delete a course', () => {
    const testCourseId = '1';
    coursesService.deleteCourse.and.returnValue(Promise.resolve());
    component.onDelete(testCourseId);
    expect(coursesService.deleteCourse.calls.count()).toBe(1, 'one call');
    expect(coursesService.deleteCourse.calls.first().args[0]).toBe(testCourseId, 'course id');
  });

  it('should open a modal with course details', () => {
    const testCourse = {
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
    };

    component.onEdit(testCourse);
    expect(coursesService.updateCourse).toHaveBeenCalledWith(testCourse.id, testCourse);
    
  });
});

