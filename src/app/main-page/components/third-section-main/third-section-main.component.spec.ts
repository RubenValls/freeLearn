import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdSectionMainComponent } from './third-section-main.component';
import { MainPageModule } from '../../main-page.module';
import { Store, StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('ThirdSectionMainComponent', () => {
  let component: ThirdSectionMainComponent;
  let fixture: ComponentFixture<ThirdSectionMainComponent>;
  let store: Store;
  let selectSpy: jasmine.Spy;

  beforeEach(() => {
    const storeSpy = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    selectSpy = storeSpy.select.and.returnValue(of([
      {
          name: 'John Doe',
          socialMedia: {
              web: 'www.johndoe.com',
              youtube: 'www.youtube.com/johndoe',
              twitter: 'www.twitter.com/johndoe',
              linkedin: 'www.linkedin.com/in/johndoe',
          },
          courses: ['Course 1', 'Course 2', 'Course 3'],
          imagePath: '/path/to/image.jpg',
          rating: [
              {
                  userId: 'user1',
                  rating: 5,
              },
              {
                  userId: 'user2',
                  rating: 4,
              },
          ],
      },
      {
          name: 'Jane Smith',
          socialMedia: {
              web: 'www.janesmith.com',
              youtube: 'www.youtube.com/janesmith',
              twitter: 'www.twitter.com/janesmith',
              linkedin: 'www.linkedin.com/in/janesmith',
          },
          courses: ['Course 4', 'Course 5', 'Course 6'],
          imagePath: '/path/to/image2.jpg',
          rating: [
              {
                  userId: 'user3',
                  rating: 5,
              },
              {
                  userId: 'user4',
                  rating: 3,
              },
          ],
      },
    ]));
    TestBed.configureTestingModule({
      declarations: [ThirdSectionMainComponent],
      imports: [
        MainPageModule,
        StoreModule.forRoot({}),
        RouterTestingModule,
      ],
      providers: [
        { provide: Store, useValue: storeSpy },
      ]
    });
    fixture = TestBed.createComponent(ThirdSectionMainComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with trainers', () => {
    const trainers = [
      {
          name: 'John Doe',
          socialMedia: {
              web: 'www.johndoe.com',
              youtube: 'www.youtube.com/johndoe',
              twitter: 'www.twitter.com/johndoe',
              linkedin: 'www.linkedin.com/in/johndoe',
          },
          courses: ['Course 1', 'Course 2', 'Course 3'],
          imagePath: '/path/to/image.jpg',
          rating: [
              {
                  userId: 'user1',
                  rating: 5,
              },
              {
                  userId: 'user2',
                  rating: 4,
              },
          ],
      },
      {
          name: 'Jane Smith',
          socialMedia: {
              web: 'www.janesmith.com',
              youtube: 'www.youtube.com/janesmith',
              twitter: 'www.twitter.com/janesmith',
              linkedin: 'www.linkedin.com/in/janesmith',
          },
          courses: ['Course 4', 'Course 5', 'Course 6'],
          imagePath: '/path/to/image2.jpg',
          rating: [
              {
                  userId: 'user3',
                  rating: 5,
              },
              {
                  userId: 'user4',
                  rating: 3,
              },
          ],
      },
    ];
    spyOn(window, 'setTimeout');

    component.ngOnInit();

    expect(selectSpy).toHaveBeenCalled();
    expect(window.setTimeout).toHaveBeenCalled();
    expect(component.trainers).toEqual(trainers);
});

});
