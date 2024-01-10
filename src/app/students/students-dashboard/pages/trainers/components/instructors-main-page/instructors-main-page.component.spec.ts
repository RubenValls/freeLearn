import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
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
});
