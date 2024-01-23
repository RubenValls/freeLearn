import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { StudentsModule } from 'src/app/students/students.module';
import { Instructor } from 'src/app/admins/admins-dashboard/pages/instructors/instructors';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        StudentsModule
      ]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit update event when rating changes', () => {
    spyOn(component.handleUpdate, 'emit');
    const newRating = 5;
    component.onRatingChanged(newRating);
    expect(component.handleUpdate.emit).toHaveBeenCalledWith(newRating);
  });

  it('should have undefined instructor on creation', () => {
    expect(component.instructor).toBeUndefined();
  });
  
  it('should set instructor when @Input is provided', () => {
    const mockInstructor: Instructor = {
      id: '1',
      name: 'John Doe',
      socialMedia: {
          web: 'www.johndoe.com',
          youtube: 'www.youtube.com/johndoe',
          twitter: 'www.twitter.com/johndoe',
          linkedin: 'www.linkedin.com/in/johndoe',
      },
      courses: ['Course 1', 'Course 2'],
      imagePath: '/path/to/image.jpg',
      rating: [
          { userId: 'user1', rating: 5 },
          { userId: 'user2', rating: 4 }
      ]
  };
  
    component.instructor = mockInstructor;
    expect(component.instructor).toEqual(mockInstructor);
  });
  
  it('should emit handleUpdate event with correct rating when onRatingChanged is called', () => {
    const mockRating = 4;
    spyOn(component.handleUpdate, 'emit');
    
    component.onRatingChanged(mockRating);
  
    expect(component.handleUpdate.emit).toHaveBeenCalledWith(mockRating);
  });
  
  it('should emit handleUpdate event with correct rating when onRatingChanged is called multiple times', () => {
    const mockRating1 = 4;
    const mockRating2 = 3;
    spyOn(component.handleUpdate, 'emit');
    
    component.onRatingChanged(mockRating1);
    component.onRatingChanged(mockRating2);
  
    expect(component.handleUpdate.emit).toHaveBeenCalledWith(mockRating1);
    expect(component.handleUpdate.emit).toHaveBeenCalledWith(mockRating2);
  });
  
  it('should emit handleUpdate event with correct rating when onRatingChanged is called with valid rating', () => {
    const mockRating = 4;
    spyOn(component.handleUpdate, 'emit');
    component.onRatingChanged(mockRating);
    expect(component.handleUpdate.emit).toHaveBeenCalledWith(mockRating);
  });
  
  it('should emit handleUpdate event with 0 rating when onRatingChanged is called with 0', () => {
    spyOn(component.handleUpdate, 'emit');
    component.onRatingChanged(0);
    expect(component.handleUpdate.emit).toHaveBeenCalledWith(0);
  });
});
