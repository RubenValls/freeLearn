import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCardsComponent } from './course-cards.component';

describe('CourseCardsComponent', () => {
  let component: CourseCardsComponent;
  let fixture: ComponentFixture<CourseCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseCardsComponent]
    });
    fixture = TestBed.createComponent(CourseCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
