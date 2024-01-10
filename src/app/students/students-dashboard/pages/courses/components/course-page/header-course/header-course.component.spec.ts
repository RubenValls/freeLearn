import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCourseComponent } from './header-course.component';

describe('HeaderCourseComponent', () => {
  let component: HeaderCourseComponent;
  let fixture: ComponentFixture<HeaderCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderCourseComponent]
    });
    fixture = TestBed.createComponent(HeaderCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
