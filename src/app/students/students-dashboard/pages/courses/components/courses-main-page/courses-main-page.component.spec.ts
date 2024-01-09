import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesMainPageComponent } from './courses-main-page.component';

describe('CoursesMainPageComponent', () => {
  let component: CoursesMainPageComponent;
  let fixture: ComponentFixture<CoursesMainPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesMainPageComponent]
    });
    fixture = TestBed.createComponent(CoursesMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
