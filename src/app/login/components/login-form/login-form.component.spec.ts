import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormComponent } from './login-form.component';
import { provideMockStore } from '@ngrx/store/testing';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from '../../login.module';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
});
