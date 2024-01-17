import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { SnackbarComponent } from './snackbar.component';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';

describe('SnackbarComponent', () => {
  let component: SnackbarComponent;
  let fixture: ComponentFixture<SnackbarComponent>;
  let alertsService: AlertsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SnackbarComponent],
      imports: [SharedModule],
      providers: [AlertsService]
    });
    fixture = TestBed.createComponent(SnackbarComponent);
    component = fixture.componentInstance;
    alertsService = TestBed.inject(AlertsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open success snackbar', () => {
    spyOn(alertsService, 'successMessage');
    component.openSuccessSnackBar();
    expect(alertsService.successMessage).toHaveBeenCalledWith('Example Success Message');
  });

  it('should open error snackbar', () => {
    spyOn(alertsService, 'errorMessage');
    component.openErrorSnackBar();
    expect(alertsService.errorMessage).toHaveBeenCalledWith('Example Error Message');
  });

  it('should open warning snackbar', () => {
    spyOn(alertsService, 'warningMessage');
    component.openWarningSnackBar();
    expect(alertsService.warningMessage).toHaveBeenCalledWith('Example Warning Message');
  });
});
