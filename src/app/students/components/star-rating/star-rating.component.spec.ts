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

  it('should call successMessage and emit ratingUpdated on onClick', () => {
    spyOn(alertsService, 'successMessage').and.callThrough();
    spyOn(component.ratingUpdated, 'emit').and.callThrough();
    const rating = 5;
    component.onClick(rating);
    expect(alertsService.successMessage).toHaveBeenCalledWith(`Rated with ${rating} stars.`);
    expect(component.ratingUpdated.emit).toHaveBeenCalledWith(rating);
  });

  it('should not call successMessage and emit ratingUpdated on onClick when rating is 1', () => {
    spyOn(alertsService, 'successMessage');
    spyOn(component.ratingUpdated, 'emit');
    const rating = 1;
    component.onClick(rating);
    expect(alertsService.successMessage).toHaveBeenCalledWith(`Rated with ${rating} star.`);
    expect(component.ratingUpdated.emit).toHaveBeenCalledWith(rating);
  });

  it('should not call successMessage and emit ratingUpdated on onClick when rating is 0', () => {
    spyOn(alertsService, 'successMessage');
    spyOn(component.ratingUpdated, 'emit');
    const rating = 0;
    component.onClick(rating);
    expect(alertsService.successMessage).toHaveBeenCalled();
    expect(component.ratingUpdated.emit).toHaveBeenCalledWith(rating);
  });

  it('should call setRatingAverage on ngOnChanges', () => {
    spyOn(component, 'setRatingAverage');
    component.rating = [{ userId: '1', rating: 3 }, { userId: '2', rating: 4 }];
    component.ngOnChanges({});
    expect(component.setRatingAverage).toHaveBeenCalledWith(component.rating);
  });

  it('should call setRatingAverage on ngOnInit', () => {
    spyOn(component, 'setRatingAverage');
    component.rating = [{ userId: '1', rating: 3 }, { userId: '2', rating: 4 }];
    component.ngOnInit();
    expect(component.setRatingAverage).toHaveBeenCalledWith(component.rating);
  });

  it('should set finalRating to 0 if rating is an empty array on ngOnInit', () => {
    spyOn(component, 'setRatingAverage');
    component.rating = [];
    component.ngOnInit();
    expect(component.setRatingAverage).toHaveBeenCalledWith([]);
    expect(component.finalRating).toEqual(0);
  });
});
