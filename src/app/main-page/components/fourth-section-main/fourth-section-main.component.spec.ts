import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourthSectionMainComponent } from './fourth-section-main.component';
import { MainPageModule } from '../../main-page.module';
import { Store, StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('FourthSectionMainComponent', () => {
  let component: FourthSectionMainComponent;
  let fixture: ComponentFixture<FourthSectionMainComponent>;
  let store: Store;
  let selectSpy: jasmine.Spy;

  beforeEach(() => {
    const storeSpy = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    selectSpy = storeSpy.select.and.returnValue(of([
      {
        id: '1',
        name: 'Angular Basics',
        description: 'Learn the basics of Angular, a popular JavaScript framework for building web applications.',
        instructorId: [{ id: '1', name: 'John Doe' }],
        imageUrl: 'path/to/angular/image',
        techs: [{ id: '1', name: 'Angular' }],
        lessons: [{ id: '1', name: 'Introduction to Angular', videoUrl: 'https://example.com/intro-to-angular' }],
        rating: [{ userId: '1', rating: 5 }],
        introductionURL: 'https://example.com/angular-basics-intro',
      },
      {
        id: '2',
        name: 'React Basics',
        description: 'Learn the basics of React, a popular JavaScript library for building user interfaces.',
        instructorId: [{ id: '2', name: 'Jane Doe' }],
        imageUrl: 'path/to/react/image',
        techs: [{ id: '2', name: 'React' }],
        lessons: [{ id: '2', name: 'Introduction to React', videoUrl: 'https://example.com/intro-to-react' }],
        rating: [{ userId: '2', rating: 4 }],
        introductionURL: 'https://example.com/react-basics-intro',
      },
    ]));
    TestBed.configureTestingModule({
      declarations: [FourthSectionMainComponent],
      imports: [
        MainPageModule,
        StoreModule.forRoot({}),
        RouterTestingModule,
      ],
      providers: [
        { provide: Store, useValue: storeSpy },
      ]
    });
    fixture = TestBed.createComponent(FourthSectionMainComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get random courses on init', () => {
    component.ngOnInit();
    expect(component.courses?.length).toBeTruthy();
  });
  
  it('should handle description correctly', () => {
    const shortDescription = 'Short description';
    const longDescription = 'This is a very long description that is definitely longer than one hundred characters. It goes on and on and on and on and on...';
    expect(component.handleDescription(shortDescription)).toBe(shortDescription);
    expect(component.handleDescription(longDescription)).toBe(longDescription.slice(0, 100) + '...');
  });
  
  it('should get random courses correctly', () => {
    const courses = [{ name: 'Course 1' }, { name: 'Course 2' }, { name: 'Course 3' }];
    const randomCourses = component.getRandomCourses(courses, 2);
    expect(randomCourses.length).toBe(2);
  });
});
