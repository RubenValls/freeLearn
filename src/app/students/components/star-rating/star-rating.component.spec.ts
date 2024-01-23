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
    component.rating = [{ userId: '1', rating: 3 }, { userId: '2', rating: 4 }];
    component.ngOnInit();
    expect(component.setRatingAverage).toHaveBeenCalledWith(component.rating);
  });

  it('should calculate average rating on ngOnChanges', () => {
    spyOn(component, 'setRatingAverage').and.callThrough();
    component.rating = [{ userId: '1', rating: 3 }, { userId: '2', rating: 4 }];
    component.ngOnChanges({});
    expect(component.setRatingAverage).toHaveBeenCalledWith(component.rating);
  });

  it('should emit ratingUpdated event and show success message on click', () => {
    spyOn(alertsService, 'successMessage').and.callThrough();
    spyOn(component.ratingUpdated, 'emit').and.callThrough();
    const rating = 5;
    component.onClick(rating);
    expect(alertsService.successMessage).toHaveBeenCalledWith(`Rated with ${rating} stars.`);
    expect(component.ratingUpdated.emit).toHaveBeenCalledWith(rating);
  });

  it('should show correct icon based on rating', () => {
    component.finalRating = 3;
    expect(component.showIcon(2)).toEqual('star');
    expect(component.showIcon(3)).toEqual('star_border');
  });
  
  it('should calculate average rating correctly', () => {
    const ratings: Rating[] = [{ userId: '1', rating: 3 }, { userId: '2', rating: 4 }];
    component.setRatingAverage(ratings);
    expect(component.finalRating).toEqual(4);
  });
  
  it('should initialize ratingArr correctly', () => {
    component.ngOnInit();
    expect(component.ratingArr).toEqual([0, 1, 2, 3, 4]);
  });
  
});
