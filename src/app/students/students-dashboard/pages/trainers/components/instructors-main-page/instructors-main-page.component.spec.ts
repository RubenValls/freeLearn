import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subscription, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { InstructorsMainPageComponent } from './instructors-main-page.component';
import { StudentsModule } from 'src/app/students/students.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Instructor } from 'src/app/admins/admins-dashboard/pages/instructors/instructors';

describe('InstructorsMainPageComponent', () => {
  let component: InstructorsMainPageComponent;
  let fixture: ComponentFixture<InstructorsMainPageComponent>;
  let store: MockStore;
  const initialState = { instructors: [] };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorsMainPageComponent],
      imports: [
        StudentsModule,
        BrowserAnimationsModule
      ],
      providers: [
        provideMockStore({ initialState })
      ]
    });
    fixture = TestBed.createComponent(InstructorsMainPageComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to instructors$', () => {
    const instructors: Instructor[] = [
      {
        id: '1',
        name: 'John Doe',
        socialMedia: {
          web: 'www.johndoe.com',
          youtube: 'www.youtube.com/johndoe',
          twitter: 'www.twitter.com/johndoe',
          linkedin: 'www.linkedin.com/in/johndoe',
        },
        courses: ['Course 1', 'Course 2'],
        imagePath: 'path/to/image',
        rating: [
          { userId: 'user1', rating: 5 },
          { userId: 'user2', rating: 4 },
        ],
      },
      {
        id: '2',
        name: 'Jane Smith',
        socialMedia: {
          web: 'www.janesmith.com',
          youtube: null,
          twitter: 'www.twitter.com/janesmith',
          linkedin: 'www.linkedin.com/in/janesmith',
        },
        courses: ['Course 3', 'Course 4'],
        imagePath: 'path/to/image',
        rating: [
          { userId: 'user3', rating: 5 },
          { userId: 'user4', rating: 3 },
        ],
      },
    ];
    store.setState({ instructors });
    component.ngOnInit();
    expect(component.instructors).toEqual(instructors);
    expect(component.topInstructors).toEqual(instructors.slice(0, 3));
  });

  it('should filter instructors by name', () => {
    const instructors: Instructor[] = [
      {
        id: '1',
        name: 'John Doe',
        socialMedia: {
          web: 'www.johndoe.com',
          youtube: 'www.youtube.com/johndoe',
          twitter: 'www.twitter.com/johndoe',
          linkedin: 'www.linkedin.com/in/johndoe',
        },
        courses: ['Course 1', 'Course 2'],
        imagePath: 'path/to/image',
        rating: [
          { userId: 'user1', rating: 5 },
          { userId: 'user2', rating: 4 },
        ],
      },
      {
        id: '2',
        name: 'Jane Smith',
        socialMedia: {
          web: 'www.janesmith.com',
          youtube: null,
          twitter: 'www.twitter.com/janesmith',
          linkedin: 'www.linkedin.com/in/janesmith',
        },
        courses: ['Course 3', 'Course 4'],
        imagePath: 'path/to/image',
        rating: [
          { userId: 'user3', rating: 5 },
          { userId: 'user4', rating: 3 },
        ],
      },
    ];
    component.instructors = instructors;
    component.name.setValue('John Doe');
    expect(component.filteredInstructors).toEqual([instructors[0]]);
  });

  it('should return filtered instructors if any', () => {
    const instructors: Instructor[] = [
      {
        id: '1',
        name: 'John Doe',
        socialMedia: {
          web: 'www.johndoe.com',
          youtube: 'www.youtube.com/johndoe',
          twitter: 'www.twitter.com/johndoe',
          linkedin: 'www.linkedin.com/in/johndoe',
        },
        courses: ['Course 1', 'Course 2'],
        imagePath: 'path/to/image',
        rating: [
          { userId: 'user1', rating: 5 },
          { userId: 'user2', rating: 4 },
        ],
      },
      {
        id: '2',
        name: 'Jane Smith',
        socialMedia: {
          web: 'www.janesmith.com',
          youtube: null,
          twitter: 'www.twitter.com/janesmith',
          linkedin: 'www.linkedin.com/in/janesmith',
        },
        courses: ['Course 3', 'Course 4'],
        imagePath: 'path/to/image',
        rating: [
          { userId: 'user3', rating: 5 },
          { userId: 'user4', rating: 3 },
        ],
      },
    ];
    component.instructors = instructors;
    component.filteredInstructors = [instructors[0]];
    expect(component.getInstructors()).toEqual([instructors[0]]);
  });

  it('should return all instructors if no filtered instructors', () => {
    const instructors: Instructor[] = [
      {
        id: '1',
        name: 'John Doe',
        socialMedia: {
          web: 'www.johndoe.com',
          youtube: 'www.youtube.com/johndoe',
          twitter: 'www.twitter.com/johndoe',
          linkedin: 'www.linkedin.com/in/johndoe',
        },
        courses: ['Course 1', 'Course 2'],
        imagePath: 'path/to/image',
        rating: [
          { userId: 'user1', rating: 5 },
          { userId: 'user2', rating: 4 },
        ],
      },
      {
        id: '2',
        name: 'Jane Smith',
        socialMedia: {
          web: 'www.janesmith.com',
          youtube: null,
          twitter: 'www.twitter.com/janesmith',
          linkedin: 'www.linkedin.com/in/janesmith',
        },
        courses: ['Course 3', 'Course 4'],
        imagePath: 'path/to/image',
        rating: [
          { userId: 'user3', rating: 5 },
          { userId: 'user4', rating: 3 },
        ],
      },
    ];
    component.instructors = instructors;
    component.filteredInstructors = [];
    expect(component.getInstructors()).toEqual(instructors);
  });

  it('should have an empty array of instructors on creation', () => {
    expect(component.instructors).toEqual([]);
  });
  
  it('should have an empty array of topInstructors on creation', () => {
    expect(component.topInstructors).toEqual([]);
  });
  
  it('should initialize name FormControl', () => {
    expect(component.name).toBeTruthy();
  });
  
  it('should subscribe to name FormControl changes', () => {
    spyOn(component.name.valueChanges, 'subscribe');
    component.ngOnInit();
    expect(component.name.valueChanges.subscribe).toHaveBeenCalled();
  });
  
  it('should filter instructors by name when name FormControl changes', () => {
    const instructors: Instructor[] = [
      { id: '1', name: 'John Doe', courses: [], imagePath: '', socialMedia: {
        web: 'https://www.instructor1.com',
        youtube: 'https://www.youtube.com/instructor1',
        twitter: 'https://twitter.com/instructor1',
        linkedin: 'https://www.linkedin.com/in/instructor1',
      }, rating: [] },
      { id: '2', name: 'Jane Smith', courses: [], imagePath: '', socialMedia: {
        web: 'https://www.instructor1.com',
        youtube: 'https://www.youtube.com/instructor1',
        twitter: 'https://twitter.com/instructor1',
        linkedin: 'https://www.linkedin.com/in/instructor1',
      }, rating: [] },
    ];
    component.instructors = instructors;
  
    component.name.setValue('John');
    expect(component.filteredInstructors).toEqual([instructors[0]]);
  
    component.name.setValue('Jane');
    expect(component.filteredInstructors).toEqual([instructors[1]]);
  
    component.name.setValue('Not Existing Name');
    expect(component.filteredInstructors).toEqual([]);
  });
  
  it('should return all instructors when filteredInstructors is empty', () => {
    const instructors: Instructor[] = [
      { id: '1', name: 'John Doe', courses: [], imagePath: '', socialMedia: {
        web: 'https://www.instructor1.com',
        youtube: 'https://www.youtube.com/instructor1',
        twitter: 'https://twitter.com/instructor1',
        linkedin: 'https://www.linkedin.com/in/instructor1',
      }, rating: [] },
      { id: '2', name: 'Jane Smith', courses: [], imagePath: '', socialMedia: {
        web: 'https://www.instructor1.com',
        youtube: 'https://www.youtube.com/instructor1',
        twitter: 'https://twitter.com/instructor1',
        linkedin: 'https://www.linkedin.com/in/instructor1',
      }, rating: [] },
    ];
    component.instructors = instructors;
    component.filteredInstructors = [];
  
    const result = component.getInstructors();
    expect(result).toEqual(instructors);
  });
  
  it('should return filtered instructors when filteredInstructors is not empty', () => {
    const instructors: Instructor[] = [
      { id: '1', name: 'John Doe', courses: [], imagePath: '', socialMedia: {
        web: 'https://www.instructor1.com',
        youtube: 'https://www.youtube.com/instructor1',
        twitter: 'https://twitter.com/instructor1',
        linkedin: 'https://www.linkedin.com/in/instructor1',
      }, rating: [] },
      { id: '2', name: 'Jane Smith', courses: [], imagePath: '', socialMedia: {
        web: 'https://www.instructor1.com',
        youtube: 'https://www.youtube.com/instructor1',
        twitter: 'https://twitter.com/instructor1',
        linkedin: 'https://www.linkedin.com/in/instructor1',
      }, rating: [] },
    ];
    component.instructors = instructors;
    component.filteredInstructors = [instructors[0]];
  
    const result = component.getInstructors();
    expect(result).toEqual([instructors[0]]);
  });
  
  it('should unsubscribe from instructors$ on ngOnDestroy', () => {
    const subscription = component.instructorsSubscription as Subscription;
    spyOn(subscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(subscription.unsubscribe).toHaveBeenCalled();
  });
  
});
