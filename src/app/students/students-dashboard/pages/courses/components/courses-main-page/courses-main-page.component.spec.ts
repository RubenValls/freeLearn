import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { CoursesMainPageComponent } from './courses-main-page.component';
import { StudentsModule } from 'src/app/students/students.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Course } from 'src/app/admins/admins-dashboard/pages/courses/interface/course';

describe('CoursesMainPageComponent', () => {
  let component: CoursesMainPageComponent;
  let fixture: ComponentFixture<CoursesMainPageComponent>;

  const course = 
  { id: '1', 
  name: 'Course 1',
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
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StudentsModule, BrowserAnimationsModule],
      declarations: [CoursesMainPageComponent],
      providers: [provideMockStore({ initialState: {} })],  
    });
    fixture = TestBed.createComponent(CoursesMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  
});
