import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { LoginFormComponent } from './login-form.component';
import { provideMockStore } from '@ngrx/store/testing';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from '../../login.module';
import { FormGroup } from '@angular/forms';
import { LoginService } from '../../login-service/login.service';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let loginService: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginFormComponent],
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
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    loginService = TestBed.inject(LoginService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a FormGroup instance', () => {
    expect(component.loginForm instanceof FormGroup).toBe(true);
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

  it('should have a login form', () => {
    expect(component.loginForm).toBeTruthy();
  });

  it('should have email and password fields', () => {
    expect(component.loginForm.contains('email')).toBeTruthy();
    expect(component.loginForm.contains('password')).toBeTruthy();
  });

  it('should make the email field required', () => {
    let control = component.loginForm.get('email');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should make the password field required', () => {
    let control = component.loginForm.get('password');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should validate email format', () => {
    let control = component.loginForm.get('email');
    control?.setValue('test');
    expect(control?.valid).toBeFalsy();
  });

  it('should validate password length', () => {
    let control = component.loginForm.get('password');
    control?.setValue('12345');
    expect(control?.valid).toBeFalsy();
  });

  it('should call loginInWithEmail when onSubmit is called and form is valid', () => {
    spyOn(loginService, 'loginInWithEmail');
    component.loginForm.setValue({email: 'test@test.com', password: 'password', rememberMe: true});
    component.onSubmit();
    expect(loginService.loginInWithEmail).toHaveBeenCalledWith(component.loginForm);
  });

  it('should not call loginInWithEmail when onSubmit is called and form is invalid', () => {
    spyOn(loginService, 'loginInWithEmail');
    component.loginForm.setValue({email: '', password: '', rememberMe: true});
    component.onSubmit();
    expect(loginService.loginInWithEmail).not.toHaveBeenCalled();
  });

  it('should call signInWithGoogle when onGoogleSubmit is called', () => {
    spyOn(loginService, 'signInWithGoogle');
    component.onGoogleSubmit();
    expect(loginService.signInWithGoogle).toHaveBeenCalledWith(component.loginForm, true);
  });

  it('should change isGoogleLoading to false after a delay when onGoogleSubmit is called', fakeAsync(() => {
    spyOn(component, 'onGoogleSubmit').and.returnValue(); 
    component.onGoogleSubmit();
    tick(3000); 
    expect(component.isGoogleLoading).toBeFalse();
  }));
});
