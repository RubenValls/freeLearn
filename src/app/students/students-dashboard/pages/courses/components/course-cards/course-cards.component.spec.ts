import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCardsComponent } from './course-cards.component';
import { StudentsModule } from 'src/app/students/students.module';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('CourseCardsComponent', () => {
  let component: CourseCardsComponent;
  let fixture: ComponentFixture<CourseCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseCardsComponent],
      imports: [StudentsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 'test' }),
            data: of({ data: { id: 'test' } }),
          },
        },
      ],
    });
    fixture = TestBed.createComponent(CourseCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate average rating correctly', () => {
    const ratings = [{rating: 5}, {rating: 4}, {rating: 3}];
    const average = component.getRatingAverage(ratings);
    expect(average).toEqual(4);
  });

  it('should calculate average rating as 0 for an empty set of ratings', () => {
    const ratings: any[] = [];
    const average = component.getRatingAverage(ratings);
    expect(average).toEqual(0);
  });

  it('should calculate average rating as 0 for undefined ratings', () => {
    const ratings: any[] | undefined = undefined;
    const average = component.getRatingAverage(ratings);
    expect(average).toEqual(0);
  });
});
