import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { StudentsModule } from "src/app/students/students.module";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { Instructor } from 'src/app/admins/admins-dashboard/pages/instructors/instructors';
import { HomeTrainersComponent } from './home-trainers.component';

describe('HomeTrainersComponent', () => {
  let component: HomeTrainersComponent;
  let fixture: ComponentFixture<HomeTrainersComponent>;
  let store: Store;
  let storeMock: any;

  beforeEach(() => {
    const instrcutorMock: Instructor[] = [
      {
        id: '1',
        name: 'John Doe',
        socialMedia: {
          web: 'www.johndoe.com',
          youtube: 'www.youtube.com/johndoe',
          twitter: 'www.twitter.com/johndoe',
          linkedin: 'www.linkedin.com/in/johndoe',
        },
        courses: ['Introduction to Angular', 'Mastering React'],
        imagePath: '/path/to/johndoe.png',
        rating: [
          { userId: '1', rating: 5 },
          { userId: '2', rating: 4 }
        ]
      },
      {
        id: '2',
        name: 'Jane Doe',
        socialMedia: {
          web: 'www.janedoe.com',
          youtube: null,
          twitter: 'www.twitter.com/janedoe',
          linkedin: 'www.linkedin.com/in/janedoe',
        },
        courses: ['React Hooks', 'Angular Components'],
        imagePath: '/path/to/janedoe.png',
        rating: [
          { userId: '3', rating: 4 },
          { userId: '4', rating: 5 }
        ]
      },
      {
        id: '1',
        name: 'John Doe',
        socialMedia: {
          web: 'www.johndoe.com',
          youtube: 'www.youtube.com/johndoe',
          twitter: 'www.twitter.com/johndoe',
          linkedin: 'www.linkedin.com/in/johndoe',
        },
        courses: ['Introduction to Angular', 'Mastering React'],
        imagePath: '/path/to/johndoe.png',
        rating: [
          { userId: '1', rating: 5 },
          { userId: '2', rating: 4 }
        ]
      },
      {
        id: '2',
        name: 'Jane Doe',
        socialMedia: {
          web: 'www.janedoe.com',
          youtube: null,
          twitter: 'www.twitter.com/janedoe',
          linkedin: 'www.linkedin.com/in/janedoe',
        },
        courses: ['React Hooks', 'Angular Components'],
        imagePath: '/path/to/janedoe.png',
        rating: [
          { userId: '3', rating: 4 },
          { userId: '4', rating: 5 }
        ]
      }
    ];
  
    storeMock = {
      select: jasmine.createSpy('select').and.returnValue(of(instrcutorMock)),
    };

    TestBed.configureTestingModule({
      declarations: [HomeTrainersComponent],
      imports:[
        StudentsModule,
        RouterTestingModule,
      ],
      providers:[
        { provide: Store, useValue: storeMock },
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(HomeTrainersComponent);
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
    expect(component.trainers).toBeTruthy();
  });

  it('should unsubscribe from coursesSubscription on destroy', () => {
    component.ngOnDestroy();
    expect(component.trainersSubscription?.closed).toBeTrue();
  });

  it('should have 4 trainers after ngOnInit', () => {
    expect(component.trainers?.length).toEqual(4);
  });
  
  it('should have random trainers after ngOnInit', () => {
    const trainersMock: Instructor[] = [
      {
        id: '1',
        name: 'John Doe',
        socialMedia: {
          web: 'www.johndoe.com',
          youtube: 'www.youtube.com/johndoe',
          twitter: 'www.twitter.com/johndoe',
          linkedin: 'www.linkedin.com/in/johndoe',
        },
        courses: ['Introduction to Angular', 'Mastering React'],
        imagePath: '/path/to/johndoe.png',
        rating: [
          { userId: '1', rating: 5 },
          { userId: '2', rating: 4 }
        ]
      },
      {
        id: '2',
        name: 'Jane Doe',
        socialMedia: {
          web: 'www.janedoe.com',
          youtube: null,
          twitter: 'www.twitter.com/janedoe',
          linkedin: 'www.linkedin.com/in/janedoe',
        },
        courses: ['React Hooks', 'Angular Components'],
        imagePath: '/path/to/janedoe.png',
        rating: [
          { userId: '3', rating: 4 },
          { userId: '4', rating: 5 }
        ]
      }
    ];
    storeMock.select.and.returnValue(of(trainersMock));
    component.ngOnInit();
    expect(component.trainers).not.toEqual(trainersMock);
  });
});