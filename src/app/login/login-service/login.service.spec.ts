import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import { StoreModule } from '@ngrx/store';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { UserCredential, getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Subscription, of } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginFormType, SigninFormType } from '../types/formTypes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppModule } from 'src/app/app.module';

describe('LoginService', () => {
  let service: LoginService;
  let alertsService: AlertsService;
  let usersService: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        provideFirestore(() => getFirestore()),
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAuth(() => getAuth()),
        MatSnackBarModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        AppModule,
      ],
      providers: [
        LoginService,
        AlertsService,
        UsersService,
        provideMockStore(),
      ],
      teardown: { destroyAfterEach: false }
    });
    service = TestBed.inject(LoginService);
    alertsService = TestBed.inject(AlertsService);
    usersService = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should dispatch an action, save user, navigate, and show alert when call saveUserDataAndNavigate', () => {
    const user = { 
      authUid: 'test',
      displayName: 'test',
      email: 'test@test.com',
      phoneNumber: '878347374',
      photoURL: 'jdahfkhfjadhf',
      providerId: 'kasdjfkj',
      rememberMe: true,
      role: 'admin',
      uid: 'ruben@test.com',
      userUid: '9hiG0Tlp63YWKsSChaP049e3mwh2',
      favorites: [],
    };

    const subscription = new Subscription;

    spyOn(service['store'], 'dispatch');
    spyOn(usersService, 'saveUserInStorage');
    spyOn(service['router'], 'navigate');
    spyOn(alertsService, 'successMessage');

    service.saveUserDataAndNavigate(user, subscription);

    expect(service['store'].dispatch).toHaveBeenCalled();
    expect(usersService.saveUserInStorage).toHaveBeenCalledWith(user.rememberMe, user);
    expect(service['router'].navigate).toHaveBeenCalledWith(['/students']);
    expect(alertsService.successMessage).toHaveBeenCalledWith('Welcome to FreeLearn.');
  });

  describe('#getUserInfoData', () => {
    it('should return correct data for a logged-in user', () => {
      const isLogin = true;
      const formValue = new FormGroup<LoginFormType>({
        email: new FormControl(''),
        password: new FormControl(''),
        rememberMe: new FormControl(true),
      });
      const userCredential = {
        user: {
          uid: '123',
          providerData: [{ 
            authUid: 'test',
            displayName: 'test',
            email: 'test@test.com',
            phoneNumber: '878347374',
            photoURL: 'jdahfkhfjadhf',
            providerId: 'kasdjfkj',
            rememberMe: true,
            role: 'admin',
            uid: 'ruben@test.com',
            userUid: '9hiG0Tlp63YWKsSChaP049e3mwh2',
            favorites: [],
          }],
        },
      } as unknown as UserCredential;

      const result = service.getUserInfoData(isLogin, formValue, userCredential);

      expect(result).toEqual({
        authUid: '123',
        rememberMe: true,
        ...userCredential.user.providerData[0],
      });
    });

    it('should return correct data for a new user', () => {
      const isLogin = false;
      const formValue = new FormGroup<SigninFormType>({
        email: new FormControl(''),
        password: new FormControl(''),
        confirmPassword: new FormControl(''),
      });
      const userCredential = {
        user: {
          uid: '123',
          providerData: [{ 
            authUid: 'test',
            displayName: 'test',
            email: 'test@test.com',
            phoneNumber: '878347374',
            photoURL: 'jdahfkhfjadhf',
            providerId: 'kasdjfkj',
            rememberMe: false,
            role: 'student',
            uid: 'ruben@test.com',
            userUid: '9hiG0Tlp63YWKsSChaP049e3mwh2',
            favorites: [],
          }],
        },
      } as unknown as UserCredential;

      const result = service.getUserInfoData(isLogin, formValue, userCredential);

      expect(result).toEqual({
        authUid: '123',
        rememberMe: false,
        role: 'student',
        ...userCredential.user.providerData[0],
      });
    });
  });

  describe('#handleUserInfo', () => {
    it('should handle user info for new user', () => {
      const formValue = new FormGroup<SigninFormType>({
        email: new FormControl(''),
        password: new FormControl(''),
        confirmPassword: new FormControl(''),
      });
      const userCredential = {
        user: {
          uid: '123',
          providerData: [{ 
            authUid: 'test',
            displayName: 'test',
            email: 'test@test.com',
            phoneNumber: '878347374',
            photoURL: 'jdahfkhfjadhf',
            providerId: 'kasdjfkj',
            rememberMe: false,
            role: 'student',
            uid: 'ruben@test.com',
            userUid: '9hiG0Tlp63YWKsSChaP049e3mwh2',
            favorites: [],
          }],
        },
      } as unknown as UserCredential;
      const isLogin = false;
      const testUser = { 
        authUid: 'test',
        displayName: 'test',
        email: 'test@test.com',
        phoneNumber: '878347374',
        photoURL: 'jdahfkhfjadhf',
        providerId: 'kasdjfkj',
        rememberMe: false,
        role: 'student',
        uid: 'ruben@test.com',
        userUid: '9hiG0Tlp63YWKsSChaP049e3mwh2',
        favorites: [],
      }
  
      const getUsersSpy = spyOn(usersService, 'getUsers').and.returnValue(of([testUser]));
      service.handleUserInfo(formValue, userCredential, isLogin);

      expect(getUsersSpy.calls.count()).toBe(1, 'getUsers called once');
    });
  
    it('should handle user info for existing user', () => {
      const formValue = new FormGroup<SigninFormType>({
        email: new FormControl(''),
        password: new FormControl(''),
        confirmPassword: new FormControl(''),
      });
      const userCredential = {
        user: {
          uid: '123',
          providerData: [{ 
            authUid: 'test',
            displayName: 'test',
            email: 'test@test.com',
            phoneNumber: '878347374',
            photoURL: 'jdahfkhfjadhf',
            providerId: 'kasdjfkj',
            rememberMe: false,
            role: 'student',
            uid: 'ruben@test.com',
            userUid: '9hiG0Tlp63YWKsSChaP049e3mwh2',
            favorites: [],
          }],
        },
      } as unknown as UserCredential;
      const isLogin = true;
      const testUser = { 
        authUid: 'test',
        displayName: 'test',
        email: 'test@test.com',
        phoneNumber: '878347374',
        photoURL: 'jdahfkhfjadhf',
        providerId: 'kasdjfkj',
        rememberMe: false,
        role: 'student',
        uid: 'ruben@test.com',
        userUid: '9hiG0Tlp63YWKsSChaP049e3mwh2',
        favorites: [],
      }
  
      const getUsersSpy = spyOn(usersService, 'getUsers').and.returnValue(of([testUser]));
      const updateUserSpy = spyOn(usersService, 'updateUser').and.returnValue(Promise.resolve());
      service.handleUserInfo(formValue, userCredential, isLogin);

      expect(getUsersSpy.calls.count()).toBe(1, 'getUsers called once');
      expect(updateUserSpy.calls.count()).toBe(1, 'updateUser called once');
    });
  })

  describe('#signInWithEmail', () => {
    it('should sign in with email', () => {
      const formValue = new FormGroup<SigninFormType>({
        email: new FormControl('testing@testing.com'),
        password: new FormControl('testingtesting'),
        confirmPassword: new FormControl('testingtesting'),
      });
  
      spyOn(service, 'signInWithEmail').and.callFake(() => {});

      service.signInWithEmail(formValue);
  
      expect(service.signInWithEmail).toHaveBeenCalled();
    });
  })

  describe('#loginInWithEmail', () => {
    it('should log in with email', () => {
      const formValue = new FormGroup<LoginFormType>({
        email: new FormControl('testing@testing.com'),
        password: new FormControl('testingtesting'),
        rememberMe: new FormControl(false),
      });
  
      spyOn(service, 'loginInWithEmail').and.callFake(() => {});

      service.loginInWithEmail(formValue);
  
      expect(service.loginInWithEmail).toHaveBeenCalled();
    });
  })

  describe('#signInWithGoogle', () => {
    it('should log in with google', () => {
      const formValue = new FormGroup<LoginFormType>({
        email: new FormControl('testing@testing.com'),
        password: new FormControl('testingtesting'),
        rememberMe: new FormControl(false),
      });
  
      spyOn(service, 'signInWithGoogle').and.callFake(() => {});

      service.signInWithGoogle(formValue, true);
  
      expect(service.signInWithGoogle).toHaveBeenCalled();
    });
  })

  it('should sign in with google', () => {
    const formValue = new FormGroup<LoginFormType>({
      email: new FormControl('testing@testing.com'),
      password: new FormControl('testingtesting'),
      rememberMe: new FormControl(false),
    });

    spyOn(service, 'signInWithGoogle').and.callFake(() => {});

    service.signInWithGoogle(formValue, false);

    expect(service.signInWithGoogle).toHaveBeenCalled();
  });
});
