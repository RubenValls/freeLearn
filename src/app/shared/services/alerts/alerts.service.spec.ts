import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertsService } from './alerts.service';

describe('AlertsService', () => {
  let service: AlertsService;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      providers: [
        AlertsService,
        { provide: MatSnackBar, useValue: spy }
      ]
    });

    service = TestBed.inject(AlertsService);
    snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should display an error message', () => {
    const message = 'Error message';
    const action = 'Close';
    const duration = 2000;

    service.errorMessage(message, action, duration);

    expect(snackBarSpy.open).toHaveBeenCalledWith(message, action, { duration, panelClass: 'error-snackbar' });
  });

  it('should display a success message', () => {
    const message = 'Success message';
    const action = 'Close';
    const duration = 2000;

    service.successMessage(message, action, duration);

    expect(snackBarSpy.open).toHaveBeenCalledWith(message, action, { duration, panelClass: 'success-snackbar' });
  });

  it('should display a warning message', () => {
    const message = 'Warning message';
    const action = 'Close';
    const duration = 2000;

    service.warningMessage(message, action, duration);

    expect(snackBarSpy.open).toHaveBeenCalledWith(message, action, { duration, panelClass: 'warning-snackbar' });
  });

  it('should display an error message using the errorMessage method', () => {
    const message = 'Error message';
    const action = 'Close';
    const duration = 2000;

    service.errorMessage(message, action, duration);

    expect(snackBarSpy.open).toHaveBeenCalledWith(message, action, { duration, panelClass: 'error-snackbar' });
  });

  it('should display a success message using the successMessage method', () => {
    const message = 'Success message';
    const action = 'Close';
    const duration = 2000;

    service.successMessage(message, action, duration);

    expect(snackBarSpy.open).toHaveBeenCalledWith(message, action, { duration, panelClass: 'success-snackbar' });
  });

  it('should display a warning message using the warningMessage method', () => {
    const message = 'Warning message';
    const action = 'Close';
    const duration = 2000;

    service.warningMessage(message, action, duration);

    expect(snackBarSpy.open).toHaveBeenCalledWith(message, action, { duration, panelClass: 'warning-snackbar' });
  });

  it('should display a custom message using the errorMessage method', () => {
    const message = 'Custom message';
    const action = 'Custom action';
    const duration = 5000;
    const customPanelClass = 'error-snackbar';

    service.errorMessage(message, action, duration);

    expect(snackBarSpy.open).toHaveBeenCalledWith(message, action, { duration, panelClass: customPanelClass });
  });

  it('should display a custom message using the successMessage method', () => {
    const message = 'Custom message';
    const action = 'Custom action';
    const duration = 5000;
    const customPanelClass = 'success-snackbar';

    service.successMessage(message, action, duration);

    expect(snackBarSpy.open).toHaveBeenCalledWith(message, action, { duration, panelClass: customPanelClass });
  });

  it('should display a custom message using the warningMessage method', () => {
    const message = 'Custom message';
    const action = 'Custom action';
    const duration = 5000;
    const customPanelClass = 'warning-snackbar';

    service.warningMessage(message, action, duration);

    expect(snackBarSpy.open).toHaveBeenCalledWith(message, action, { duration, panelClass: customPanelClass });
  });
});
