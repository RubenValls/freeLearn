import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorCardComponent } from './instructor-card.component';
import { SharedModule } from '../../shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Instructor } from 'src/app/admins/admins-dashboard/pages/instructors/instructors';

describe('InstructorCardComponent', () => {
  let component: InstructorCardComponent;
  let fixture: ComponentFixture<InstructorCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorCardComponent],
      imports: [
        SharedModule,
        RouterTestingModule,
      ]
    });
    fixture = TestBed.createComponent(InstructorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have no instructor input by default', () => {
    expect(component.instructor).toBeUndefined();
  });

  it('should have instructor if input', () => {
    component.instructor = {
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
    }
    expect(component.instructor).toBeDefined();
  });

  it('should accept instructor input', () => {
    const instructor: Instructor = {
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
    };
    component.instructor = instructor;
    fixture.detectChanges();
    expect(component.instructor).toBe(instructor);
  });
});
