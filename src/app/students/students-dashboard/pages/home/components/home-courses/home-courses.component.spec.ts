import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HomeCoursesComponent } from "./home-courses.component";
import { StudentsModule } from "src/app/students/students.module";
import { Store } from "@ngrx/store";
import { Course } from "src/app/admins/admins-dashboard/pages/courses/interface/course";
import { of } from "rxjs";

describe('HomeCoursesComponent', () => {
  let component: HomeCoursesComponent;
  let fixture: ComponentFixture<HomeCoursesComponent>;
  let store: Store;
  let storeMock: any;

  beforeEach(() => {
    const coursesMock: Course[] = [
      {
        id: '1',
        name: 'Introduction to Angular',
        description: 'A beginner\'s guide to Angular.',
        instructorId: [
          { id: '1', name: 'John Doe' }
        ],
        imageUrl: '/path/to/angular.png',
        techs: [
          { id: '1', name: 'Angular' }
        ],
        lessons: [
          { id: '1', name: 'Angular Basics', videoUrl: '/path/to/angular-basics.mp4' },
          { id: '2', name: 'Angular Components', videoUrl: '/path/to/angular-components.mp4' }
        ],
        rating: [
          { userId: '1', rating: 5 },
          { userId: '2', rating: 4 }
        ],
        introductionURL: '/path/to/introduction.mp4'
      },
      {
        id: '2',
        name: 'Mastering React',
        description: 'An advanced course on React.',
        instructorId: [
          { id: '2', name: 'Jane Doe' }
        ],
        imageUrl: '/path/to/react.png',
        techs: [
          { id: '2', name: 'React' }
        ],
        lessons: [
          { id: '3', name: 'React Hooks', videoUrl: '/path/to/react-hooks.mp4' },
          { id: '4', name: 'React Context', videoUrl: '/path/to/react-context.mp4' }
        ],
        rating: [
          { userId: '3', rating: 4 },
          { userId: '4', rating: 5 }
        ],
        introductionURL: '/path/to/introduction.mp4'
      },
      {
        id: '1',
        name: 'Introduction to Angular',
        description: 'A beginner\'s guide to Angular.',
        instructorId: [
          { id: '1', name: 'John Doe' }
        ],
        imageUrl: '/path/to/angular.png',
        techs: [
          { id: '1', name: 'Angular' }
        ],
        lessons: [
          { id: '1', name: 'Angular Basics', videoUrl: '/path/to/angular-basics.mp4' },
          { id: '2', name: 'Angular Components', videoUrl: '/path/to/angular-components.mp4' }
        ],
        rating: [
          { userId: '1', rating: 5 },
          { userId: '2', rating: 4 }
        ],
        introductionURL: '/path/to/introduction.mp4'
      },
      {
        id: '2',
        name: 'Mastering React',
        description: 'An advanced course on React.',
        instructorId: [
          { id: '2', name: 'Jane Doe' }
        ],
        imageUrl: '/path/to/react.png',
        techs: [
          { id: '2', name: 'React' }
        ],
        lessons: [
          { id: '3', name: 'React Hooks', videoUrl: '/path/to/react-hooks.mp4' },
          { id: '4', name: 'React Context', videoUrl: '/path/to/react-context.mp4' }
        ],
        rating: [
          { userId: '3', rating: 4 },
          { userId: '4', rating: 5 }
        ],
        introductionURL: '/path/to/introduction.mp4'
      }
    ];
  
    storeMock = {
      select: jasmine.createSpy('select').and.returnValue(of(coursesMock)),
    };

    TestBed.configureTestingModule({
      declarations: [HomeCoursesComponent],
      imports:[
        StudentsModule,
        RouterTestingModule,
      ],
      providers:[
        { provide: Store, useValue: storeMock },
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(HomeCoursesComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call select from store on init', () => {
    expect(storeMock.select).toHaveBeenCalled();
  });

  it('should select courses from store on init', () => {
    expect(component.courses).toBeTruthy();
  });

  it('should unsubscribe from coursesSubscription on destroy', () => {
    component.ngOnDestroy();
    expect(component.coursesSubscription?.closed).toBeTrue();
  });

  it('should have 4 courses after ngOnInit', () => {
    expect(component.courses?.length).toEqual(4);
  });
  
  it('should have random courses after ngOnInit', () => {
    const coursesMock: Course[] = [
      {
        id: '1',
        name: 'Introduction to Angular',
        description: 'A beginner\'s guide to Angular.',
        instructorId: [
          { id: '1', name: 'John Doe' }
        ],
        imageUrl: '/path/to/angular.png',
        techs: [
          { id: '1', name: 'Angular' }
        ],
        lessons: [
          { id: '1', name: 'Angular Basics', videoUrl: '/path/to/angular-basics.mp4' },
          { id: '2', name: 'Angular Components', videoUrl: '/path/to/angular-components.mp4' }
        ],
        rating: [
          { userId: '1', rating: 5 },
          { userId: '2', rating: 4 }
        ],
        introductionURL: '/path/to/introduction.mp4'
      },
      {
        id: '2',
        name: 'Mastering React',
        description: 'An advanced course on React.',
        instructorId: [
          { id: '2', name: 'Jane Doe' }
        ],
        imageUrl: '/path/to/react.png',
        techs: [
          { id: '2', name: 'React' }
        ],
        lessons: [
          { id: '3', name: 'React Hooks', videoUrl: '/path/to/react-hooks.mp4' },
          { id: '4', name: 'React Context', videoUrl: '/path/to/react-context.mp4' }
        ],
        rating: [
          { userId: '3', rating: 4 },
          { userId: '4', rating: 5 }
        ],
        introductionURL: '/path/to/introduction.mp4'
      }
    ];
    storeMock.select.and.returnValue(of(coursesMock));
    component.ngOnInit();
    expect(component.courses).not.toEqual(coursesMock);
  });
});