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

describe('SignupFormComponent', () => {
  let component: SignupFormComponent;
  let fixture: ComponentFixture<SignupFormComponent>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
});
