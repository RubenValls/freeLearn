import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonsCourseComponent } from './lessons-course.component';

describe('LessonsCourseComponent', () => {
  let component: LessonsCourseComponent;
  let fixture: ComponentFixture<LessonsCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LessonsCourseComponent]
    });
    fixture = TestBed.createComponent(LessonsCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
