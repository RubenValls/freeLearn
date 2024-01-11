import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { CoursePageComponent } from './course-page.component';

fdescribe('CoursePageComponent', () => {
  let component: CoursePageComponent;
  let fixture: ComponentFixture<CoursePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CoursePageComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 'test' })
          }
        }
      ]
    });
    fixture = TestBed.createComponent(CoursePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
