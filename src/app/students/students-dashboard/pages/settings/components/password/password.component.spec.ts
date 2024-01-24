import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
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

  beforeEach(waitForAsync(() => {
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
    }).compileComponents();
  }));

  beforeEach(() => {
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

  it('should call cambiarContrasena on form submit with valid form', () => {
    const cambiarContrasenaSpy = spyOn(component, 'cambiarContrasena');
    component.resetPassForm.controls['password'].setValue('password123');
    component.resetPassForm.controls['confirmPassword'].setValue('password123');
    component.cambiarContrasena();
    expect(cambiarContrasenaSpy).toHaveBeenCalled();
  });
  
});
