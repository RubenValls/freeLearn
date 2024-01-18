import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupFormComponent } from './signup-form.component';
import { LoginModule } from '../../login.module';
import { provideMockStore } from '@ngrx/store/testing';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormGroup } from '@angular/forms';
import { LoginService } from '../../login-service/login.service';

describe('SignupFormComponent', () => {
  let component: SignupFormComponent;
  let fixture: ComponentFixture<SignupFormComponent>;
  let loginService: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupFormComponent],
      imports: [
        LoginModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
        provideFirestore(() => getFirestore()),
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAuth(() => getAuth()),
      ],
      providers: [ provideMockStore({}) ]
    });
    fixture = TestBed.createComponent(SignupFormComponent);
    component = fixture.componentInstance;
    loginService = TestBed.inject(LoginService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a FormGroup instance', () => {
    expect(component.signupForm instanceof FormGroup).toBe(true);
  });

  it('should have hidePassword property', () => {
    expect(component.hidePassword).toBeDefined();
  });

  it('should have hideConfirmPassword property', () => {
    expect(component.hideConfirmPassword).toBeDefined();
  });

  it('should have isLoading property', () => {
    expect(component.isLoading).toBeDefined();
  });

  it('should have isGoogleLoading property', () => {
    expect(component.isGoogleLoading).toBeDefined();
  });

  it('should have a signup form', () => {
    expect(component.signupForm).toBeTruthy();
  });

  it('should have email, password and confirmPassword fields', () => {
    expect(component.signupForm.contains('email')).toBeTruthy();
    expect(component.signupForm.contains('password')).toBeTruthy();
    expect(component.signupForm.contains('confirmPassword')).toBeTruthy();
  });

  it('should make the email field required', () => {
    let control = component.signupForm.get('email');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should make the password field required', () => {
    let control = component.signupForm.get('password');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should validate email format', () => {
    let control = component.signupForm.get('email');
    control?.setValue('test');
    expect(control?.valid).toBeFalsy();
  });

  it('should validate password length', () => {
    let control = component.signupForm.get('password');
    control?.setValue('12345');
    expect(control?.valid).toBeFalsy();
  });

  it('should validate password and confirmPassword match', () => {
    let passwordControl = component.signupForm.get('password');
    let confirmPasswordControl = component.signupForm.get('confirmPassword');
    passwordControl?.setValue('123456');
    confirmPasswordControl?.setValue('1234567');
    expect(confirmPasswordControl?.valid).toBeFalsy();
  });

  it('should validate password and confirm password fields match', () => {
    component.signupForm.setValue({email: 'test@test.com', password: 'password', confirmPassword: 'password'});
    expect(component.signupForm.get('confirmPassword')?.errors).toBeNull();
  });

  it('should invalidate when password and confirm password fields do not match', () => {
    component.signupForm.setValue({email: 'test@test.com', password: 'password', confirmPassword: 'different'});
    expect(component.signupForm.get('confirmPassword')?.errors?.['notMatching']).toBeTrue();
  });

  it('should call signInWithEmail when onSubmit is called and form is valid', () => {
    spyOn(loginService, 'signInWithEmail');
    component.signupForm.setValue({email: 'test@test.com', password: 'password', confirmPassword: 'password'});
    component.onSubmit();
    expect(loginService.signInWithEmail).toHaveBeenCalledWith(component.signupForm);
  });

  it('should not call signInWithEmail when onSubmit is called and form is invalid', () => {
    spyOn(loginService, 'signInWithEmail');
    component.signupForm.setValue({email: '', password: '', confirmPassword: ''});
    component.onSubmit();
    expect(loginService.signInWithEmail).not.toHaveBeenCalled();
  });

  it('should call signInWithGoogle when onGoogleSubmit is called', () => {
    spyOn(loginService, 'signInWithGoogle');
    component.onGoogleSubmit();
    expect(loginService.signInWithGoogle).toHaveBeenCalledWith(component.signupForm, false);
  });
});
