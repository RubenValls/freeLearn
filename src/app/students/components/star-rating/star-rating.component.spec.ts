import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StarRatingComponent } from './star-rating.component';
import { StudentsModule } from '../../students.module';
import { Rating } from 'src/app/admins/admins-dashboard/pages/courses/interface/course';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';
import { of } from 'rxjs';

describe('StarRatingComponent', () => {
  let component: StarRatingComponent;
  let fixture: ComponentFixture<StarRatingComponent>;
  let alertsService: AlertsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StarRatingComponent],
      imports: [
        StudentsModule
      ],
      providers: [
        { provide: AlertsService, useValue: { successMessage: () => of() } }
      ]
    });
    fixture = TestBed.createComponent(StarRatingComponent);
    component = fixture.componentInstance;
    alertsService = TestBed.inject(AlertsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate average rating on ngOnInit', () => {
    spyOn(component, 'setRatingAverage').and.callThrough();
    component.ratings = [{ userId: '1', rating: 3 }, { userId: '2', rating: 4 }];
    component.ngOnInit();
    expect(component.setRatingAverage).toHaveBeenCalledWith(component.ratings);
  });

  it('should calculate average rating on ngOnChanges', () => {
    spyOn(component, 'setRatingAverage').and.callThrough();
    component.ratings = [{ userId: '1', rating: 3 }, { userId: '2', rating: 4 }];
    component.ngOnChanges({});
    expect(component.setRatingAverage).toHaveBeenCalledWith(component.ratings);
  });

  it('should emit ratingUpdated event and show success message on click', () => {
    spyOn(alertsService, 'successMessage').and.callThrough();
    spyOn(component.ratingUpdated, 'emit').and.callThrough();
    const rating = 5;
    component.onClick(rating);
    expect(alertsService.successMessage).toHaveBeenCalledWith(`Rated with ${rating} stars.`);
    expect(component.ratingUpdated.emit).toHaveBeenCalledWith(rating);
  });
});
