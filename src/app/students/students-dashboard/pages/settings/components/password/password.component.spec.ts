import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';
import { PasswordComponent } from './password.component';
import { StudentsModule } from 'src/app/students/students.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PasswordComponent', () => {
  let component: PasswordComponent;
  let fixture: ComponentFixture<PasswordComponent>;
  let alertService: AlertsService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordComponent],
      imports: [
        StudentsModule,
        BrowserAnimationsModule,
      ],
      providers: [
        FormBuilder,
        { provide: AlertsService, useValue: { successMessage: () => {}, errorMessage: () => {} } },
        { provide: Router, useValue: { navigate: () => {} } }
      ]
    });
    fixture = TestBed.createComponent(PasswordComponent);
    component = fixture.componentInstance;
    alertService = TestBed.inject(AlertsService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize resetPassForm on creation', () => {
    expect(component.resetPassForm).toBeDefined();
    expect(component.resetPassForm.controls['password']).toBeDefined();
    expect(component.resetPassForm.controls['confirmPassword']).toBeDefined();
  });

});
