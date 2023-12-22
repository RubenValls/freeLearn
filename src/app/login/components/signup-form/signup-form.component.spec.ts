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
});
