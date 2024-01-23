import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageComponent } from './login-page.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { Router } from '@angular/router';
import { LoginFormComponent } from '../components/login-form/login-form.component';
import { provideMockStore } from '@ngrx/store/testing';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
        provideMockStore({})
      ],
      imports: [
        MatIconModule,
        MatButtonToggleModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        provideFirestore(() => getFirestore()),
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAuth(() => getAuth()),
      ],
      declarations: [LoginPageComponent, LoginFormComponent]
    });
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should navigate back when onHandleBack is called', () => {
    component.onHandleBack();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should set isLogIn to true when onChange is called with login', () => {
    const changeEvent: MatButtonToggleChange = { source: null as any, value: 'login' };
    component.onChange(changeEvent);
    expect(component.isLogIn).toBeTrue();
  });

  it('should set isLogIn to false when onChange is called with any value other than login', () => {
    const changeEvent: MatButtonToggleChange = { source: null as any, value: 'register' };
    component.onChange(changeEvent);
    expect(component.isLogIn).toBeFalse();
  });

  it('should have isLogIn defined', () => {
    expect(component.isLogIn).toBeDefined();
  });

  it('should have isLogIn set to true by default', () => {
    expect(component.isLogIn).toBeTrue();
  });

  it('should change isLogIn to false when onChange is called with register', () => {
    const changeEvent: MatButtonToggleChange = { source: null as any, value: 'register' };
    component.onChange(changeEvent);
    expect(component.isLogIn).toBeFalse();
  });
});
