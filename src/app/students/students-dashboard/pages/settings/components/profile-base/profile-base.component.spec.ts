import { StudentsModule } from 'src/app/students/students.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBaseComponent } from './profile-base.component';
import { provideMockStore } from '@ngrx/store/testing';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth'
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
});
