import { ComponentFixture, TestBed} from '@angular/core/testing';
import { CourseCardComponent } from './course-card.component';
import { SharedModule } from '../../shared.module';
import { Course } from 'src/app/admins/admins-dashboard/pages/courses/interface/course';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';

describe('CourseCardComponent', () => {
  let component: CourseCardComponent;
  let fixture: ComponentFixture<CourseCardComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseCardComponent ],
      imports: [
        SharedModule,
        RouterTestingModule.withRoutes([]),
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseCardComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a course undefined by default', () => {
    expect(component.course).toBeUndefined();
  });

  it('should have a course if input', () => {
    component.course = {
      id: '2',
      name: 'React Basics',
      description: 'Learn the basics of React, a popular JavaScript library for building user interfaces.',
      instructorId: [{ id: '2', name: 'Jane Doe' }],
      imageUrl: 'path/to/react/image',
      techs: [{ id: '2', name: 'React' }],
      lessons: [{ id: '2', name: 'Introduction to React', videoUrl: 'https://example.com/intro-to-react' }],
      rating: [{ userId: '2', rating: 4 }],
      introductionURL: 'https://example.com/react-basics-intro',
    }
    expect(component.course).toBeDefined();
  });

  it('should handle short description correctly', () => {
    const shortDescription = 'short description';
    expect(component.handleDescription(shortDescription)).toEqual(shortDescription);
  });

  it('should handle long description correctly', () => {
    const longDescription = 'a'.repeat(101);
    expect(component.handleDescription(longDescription)).toEqual('a'.repeat(100) + '...');
  });

  it('should handle course input correctly', () => {
    const course: Course = {
      id: '2',
      name: 'React Basics',
      description: 'Learn the basics of React, a popular JavaScript library for building user interfaces.',
      instructorId: [{ id: '2', name: 'Jane Doe' }],
      imageUrl: 'path/to/react/image',
      techs: [{ id: '2', name: 'React' }],
      lessons: [{ id: '2', name: 'Introduction to React', videoUrl: 'https://example.com/intro-to-react' }],
      rating: [{ userId: '2', rating: 4 }],
      introductionURL: 'https://example.com/react-basics-intro',
    };
    component.course = course;
    expect(component.course).toEqual(course);
  });

});
