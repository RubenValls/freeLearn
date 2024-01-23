import { StudentsModule } from 'src/app/students/students.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBaseComponent } from './profile-base.component';
import { provideMockStore } from '@ngrx/store/testing';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth'
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('ProfileBaseComponent', () => {
  let component: ProfileBaseComponent;
  let fixture: ComponentFixture<ProfileBaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileBaseComponent],
      imports: [
        StudentsModule,
        BrowserAnimationsModule,
        provideFirestore(() => getFirestore()),
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAuth(() => getAuth()),
      ],
      providers: [
        provideMockStore(),
      ]
    });
    fixture = TestBed.createComponent(ProfileBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize profile form', () => {
    expect(component.profileForm).toBeDefined();
    expect(component.profileForm.get('email')).toBeDefined();
    expect(component.profileForm.get('phoneNumber')).toBeDefined();
    expect(component.profileForm.get('displayName')).toBeDefined();
    expect(component.profileForm.get('photoURL')).toBeDefined();
  });

  it('should update user profile on submit if form is valid', () => {
    const spyDialog = spyOn(component.dialog, 'open');
    component.profileForm.setValue({ email: 'test@example.com', phoneNumber: '', displayName: '', photoURL: '' });
    component.onSubmit();
    expect(spyDialog).toHaveBeenCalled();
  });

  it('should not update user profile on submit if form is invalid', () => {
    const spyDialog = spyOn(component.dialog, 'open');
    component.profileForm.setValue({ email: '', phoneNumber: '', displayName: '', photoURL: '' });
    component.onSubmit();
    expect(spyDialog).not.toHaveBeenCalled();
  });

  it('should update user profile on edit if user is defined', async () => {
    const userUpdated = { 
      id: '1',
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
    const updateUserSpy = spyOn(component.userService, 'updateUser').and.returnValue(Promise.resolve());
    const successMessageSpy = spyOn(component.alertMessage, 'successMessage');
    const storeSpy = spyOn(component.store, 'dispatch');
    const userServiceSpy = spyOn(component.userService, 'saveUserInStorage');
    component.user = userUpdated;
    await component.onEdit(userUpdated);
    expect(updateUserSpy).toHaveBeenCalledWith(userUpdated.id, userUpdated);
    expect(successMessageSpy).toHaveBeenCalledWith('Profile update succesfully');
    expect(storeSpy).toHaveBeenCalled();
    expect(userServiceSpy).toHaveBeenCalled();
  });
    
  it('should patch user values to profile form on ngOnInit if user is defined', () => {
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
    const expectedFormValue = {
      email: user.email,
      phoneNumber: user.phoneNumber,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
    component.user$ = of(user);
    component.ngOnInit();
    expect(component.profileForm.value).toEqual(expectedFormValue);
  });
  
  
  it('should not patch user values to profile form on ngOnInit if user is undefined', () => {
    component.user$ = of(undefined);
    component.ngOnInit();
    expect(component.profileForm.value).toEqual({ email: '', phoneNumber: '', displayName: '', photoURL: '' });
  });
  
});
