import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Course } from './interface/course';
import { of } from 'rxjs';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let store: Store;
  let coursesService: jasmine.SpyObj<CoursesService>;
  let alertsService: jasmine.SpyObj<AlertsService>;

  beforeEach(async () => {
    const coursesServiceSpy = jasmine.createSpyObj('CoursesService', ['updateCourse', 'deleteCourse', 'getCourseById', 'getCourses']);
    const alertsServiceSpy = jasmine.createSpyObj('AlertsService', ['successMessage', 'errorMessage']);
  
    coursesServiceSpy.updateCourse.and.returnValue(Promise.resolve());
    coursesServiceSpy.getCourses.and.returnValue(of([])); // You can customize the return value as needed
  
    await TestBed.configureTestingModule({
      declarations: [ CoursesComponent ],
      imports: [ 
        AdminsModule,
        BrowserAnimationsModule,
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
    component.watchForm = false;
    component.addCourse();
    expect(component.watchForm).toBe(true);
    component.addCourse();
    expect(component.watchForm).toBe(false);
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

  it('should filter courses based on input', () => {
    const testCourses: Course[] = [
      { id: '1', 
    name: 'Course 1',
    description:'Course 1',   
    techs: [{name: 'React', id: '1234'}, {name: 'Typescript', id: '1234'}],
    instructorId: [{name: 'Midudev', id: '1'}, {name: 'Mouredev', id: '2'}], 
    imageUrl: 'https://www.google.com',
    lessons: [{
       id: '1',
       name: 'Lesson 1',
       videoUrl: 'https://www.google.com' 
      }],
    rating: [{
      userId: '1',
      rating: 4
    }],
      introductionURL: 'http://example.com/intro'
    },
    { id: '2', 
    name: 'Angular',
    description:'Course 1',   
    techs: [{name: 'Angular', id: '1234'}, {name: 'Typescript', id: '1234'}],
    instructorId: [{name: 'Midudev', id: '1'}, {name: 'Mouredev', id: '2'}], 
    imageUrl: 'https://www.google.com',
    lessons: [{
       id: '1',
       name: 'Lesson 1',
       videoUrl: 'https://www.google.com' 
      }],
    rating: [{
      userId: '1',
      rating: 4
    }],
      introductionURL: 'http://example.com/intro'
    },
    ];

    const filteredCourses = component.filterCourse(testCourses, 'Angular');

    expect(filteredCourses.length).toBe(1);

    expect(filteredCourses[0]).toEqual(
      { id: '2', 
    name: 'Angular',
    description:'Course 1',   
    techs: [{name: 'Angular', id: '1234'}, {name: 'Typescript', id: '1234'}],
    instructorId: [{name: 'Midudev', id: '1'}, {name: 'Mouredev', id: '2'}], 
    imageUrl: 'https://www.google.com',
    lessons: [{
       id: '1',
       name: 'Lesson 1',
       videoUrl: 'https://www.google.com' 
      }],
    rating: [{
      userId: '1',
      rating: 4
    }],
      introductionURL: 'http://example.com/intro'
    },
    );

    const noMatchFilteredCourses = component.filterCourse(testCourses, 'JavaScript');

    expect(noMatchFilteredCourses).toEqual([]);
  });

  it('should update currentPage and pageSize on page change', fakeAsync(() => {
    component.currentPage = 0;
    component.pageSize = 10;
  
    const event = { pageIndex: 1, pageSize: 20 };
  
    component.onPageChange(event);
  
    tick();
  
    
    expect(component.currentPage).toBe(event.pageIndex);
    expect(component.pageSize).toBe(event.pageSize);

  }));

  it('should update currentPage and pageSize on page change', fakeAsync(() => {
    const mockCourses$ = of([]);

    spyOn(component, 'getCourses').and.callThrough();
    spyOn(component.courses$, 'pipe').and.returnValue(mockCourses$);

    component.currentPage = 0;
    component.pageSize = 10;

    const event = { pageIndex: 1, pageSize: 20 };

    component.onPageChange(event);

    tick();

    expect(component.currentPage).toBe(event.pageIndex);
    expect(component.pageSize).toBe(event.pageSize);

    expect(component.getCourses).toHaveBeenCalled();
    expect(component.courses$.pipe).toHaveBeenCalled();
  }));

  it('should update currentPage and pageSize on page change', fakeAsync(() => {
    const mockCourses$ = of([]);
  
    spyOn(component, 'getCourses').and.callThrough();
    spyOn(component.courses$, 'pipe').and.returnValue(mockCourses$);
  
    component.currentPage = 0;
    component.pageSize = 10;
  
    const event = { pageIndex: 1, pageSize: 20 };
  
    component.onPageChange(event);
  
    tick();
  
    expect(component.currentPage).toBe(event.pageIndex);
    expect(component.pageSize).toBe(event.pageSize);
  
    expect(component.getCourses).toHaveBeenCalled();
    expect(component.courses$.pipe).toHaveBeenCalled();
  }));
  
  it('should return filteredCourses when filteredCourses is not empty', () => {
    // Arrange
    component.filteredCourses = [{ id: '1', 
    name: 'Angular',
    description:'Course 1',   
    techs: [{name: 'Angular', id: '1234'}, {name: 'Typescript', id: '1234'}],
    instructorId: [{name: 'Midudev', id: '1'}, {name: 'Mouredev', id: '2'}], 
    imageUrl: 'https://www.google.com',
    lessons: [{
       id: '1',
       name: 'Lesson 1',
       videoUrl: 'https://www.google.com' 
      }],
    rating: [{
      userId: '1',
      rating: 4
    }],
      introductionURL: 'http://example.com/intro'
    }, { id: '2', 
    name: 'React',
    description:'Course 2',   
    techs: [{name: 'React', id: '1234'}, {name: 'Typescript', id: '1234'}],
    instructorId: [{name: 'Midudev', id: '1'}, {name: 'Mouredev', id: '2'}], 
    imageUrl: 'https://www.google.com',
    lessons: [{
       id: '1',
       name: 'Lesson 1',
       videoUrl: 'https://www.google.com' 
      }],
    rating: [{
      userId: '1',
      rating: 4
    }],
      introductionURL: 'http://example.com/intro'
    }];
    component.currentPage = 0;
    component.pageSize = 10;

    // Act
    const result = component.getCourses();

    // Assert
    expect(result).toEqual([{ id: '1', 
    name: 'Angular',
    description:'Course 1',   
    techs: [{name: 'Angular', id: '1234'}, {name: 'Typescript', id: '1234'}],
    instructorId: [{name: 'Midudev', id: '1'}, {name: 'Mouredev', id: '2'}], 
    imageUrl: 'https://www.google.com',
    lessons: [{
       id: '1',
       name: 'Lesson 1',
       videoUrl: 'https://www.google.com' 
      }],
    rating: [{
      userId: '1',
      rating: 4
    }],
      introductionURL: 'http://example.com/intro'
    },
    { id: '2', 
    name: 'React',
    description:'Course 2',   
    techs: [{name: 'React', id: '1234'}, {name: 'Typescript', id: '1234'}],
    instructorId: [{name: 'Midudev', id: '1'}, {name: 'Mouredev', id: '2'}], 
    imageUrl: 'https://www.google.com',
    lessons: [{
       id: '1',
       name: 'Lesson 1',
       videoUrl: 'https://www.google.com' 
      }],
    rating: [{
      userId: '1',
      rating: 4
    }],
      introductionURL: 'http://example.com/intro'
    }]);
  });

  it('should return courses$ when filteredCourses is empty', fakeAsync(() => {
    const courses = [
      {
        id: '1',
        name: 'Angular',
        description: 'Course 1',
        techs: [{ name: 'Angular', id: '1234' }, { name: 'Typescript', id: '1234' }],
        instructorId: [{ name: 'Midudev', id: '1' }, { name: 'Mouredev', id: '2' }],
        imageUrl: 'https://www.google.com',
        lessons: [{ id: '1', name: 'Lesson 1', videoUrl: 'https://www.google.com' }],
        rating: [{ userId: '1', rating: 4 }],
        introductionURL: 'http://example.com/intro'
      },
      {
        id: '2',
        name: 'React',
        description: 'Course 2',
        techs: [{ name: 'React', id: '1234' }, { name: 'Typescript', id: '1234' }],
        instructorId: [{ name: 'Midudev', id: '1' }, { name: 'Mouredev', id: '2' }],
        imageUrl: 'https://www.google.com',
        lessons: [{ id: '1', name: 'Lesson 1', videoUrl: 'https://www.google.com' }],
        rating: [{ userId: '1', rating: 4 }],
        introductionURL: 'http://example.com/intro'
      }
    ];
  
    coursesService.getCourses.and.returnValue(of(courses));
    component.currentPage = 0;
    component.pageSize = 10;
  
    let result: any;
    component.getCourses().subscribe((data: any) => {
      result = data;
    });
    tick();
  
    expect(component.filteredCourses).toEqual([]);
  }));
  
  it('should call deleteCourse and display error message on delete failure', fakeAsync(() => {
    const courseId = '1';
    const error = new Error('Delete error');
  
    coursesService.deleteCourse.and.returnValue(Promise.reject(error));
  
    component.onDelete(courseId);
    tick();
  
    expect(coursesService.deleteCourse).toHaveBeenCalledWith(courseId);
    expect(alertsService.errorMessage).toHaveBeenCalledWith('Error deleting Course', error.message);
  }));

  it('should call updateCourse and display error message on update failure', fakeAsync(() => {
    const course: Course = {
      id: '1',
      name: 'Angular',
      description: 'Course 1',
      techs: [{ name: 'Angular', id: '1234' }],
      instructorId: [{ name: 'Midudev', id: '1' }],
      imageUrl: 'https://www.google.com',
      lessons: [{ id: '1', name: 'Lesson 1', videoUrl: 'https://www.google.com' }],
      rating: [{ userId: '1', rating: 4 }],
      introductionURL: 'http://example.com/intro'
    };
  
    coursesService.updateCourse.and.returnValue(Promise.reject(new Error('Update failed')));
  
    component.onEdit(course);
    tick();
  
    expect(coursesService.updateCourse).toHaveBeenCalledWith('1', course);
    expect(alertsService.errorMessage).toHaveBeenCalledWith('Error updating Course: ', 'Update failed');
  }));

  it('should filter courses', fakeAsync(() => {
    const courses = [
      {
        id: '1',
        name: 'Angular',
        description: 'Course 1',
        techs: [{ name: 'Angular', id: '1234' }, { name: 'Typescript', id: '1234' }],
        instructorId: [{ name: 'Midudev', id: '1' }, { name: 'Mouredev', id: '2' }],
        imageUrl: 'https://www.google.com',
        lessons: [{ id: '1', name: 'Lesson 1', videoUrl: 'https://www.google.com' }],
        rating: [{ userId: '1', rating: 4 }],
        introductionURL: 'http://example.com/intro'
      },
      {
        id: '2',
        name: 'React',
        description: 'Course 2',
        techs: [{ name: 'React', id: '1234' }, { name: 'Typescript', id: '1234' }],
        instructorId: [{ name: 'Midudev', id: '1' }, { name: 'Mouredev', id: '2' }],
        imageUrl: 'https://www.google.com',
        lessons: [{ id: '1', name: 'Lesson 1', videoUrl: 'https://www.google.com' }],
        rating: [{ userId: '1', rating: 4 }],
        introductionURL: 'http://example.com/intro'
      }
    ];
    component.courses$ = of(courses);

    component.ngOnInit();

    tick();

    expect(component.totalItems).toBe(2);
    component.searchCoursesControl.setValue('React');

    tick();
    expect(component.filteredCourses).toEqual([{
      id: '2',
      name: 'React',
      description: 'Course 2',
      techs: [{ name: 'React', id: '1234' }, { name: 'Typescript', id: '1234' }],
      instructorId: [{ name: 'Midudev', id: '1' }, { name: 'Mouredev', id: '2' }],
      imageUrl: 'https://www.google.com',
      lessons: [{ id: '1', name: 'Lesson 1', videoUrl: 'https://www.google.com' }],
      rating: [{ userId: '1', rating: 4 }],
      introductionURL: 'http://example.com/intro'
    }]);

    component.searchCoursesControl.setValue('');
    tick();
    expect(component.filteredCourses).toEqual(courses)
  }));
  
});

