import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsCourseComponent } from './details-course.component';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth'
import { environment } from 'src/environments/environment';

describe('DetailsCourseComponent', () => {
  let component: DetailsCourseComponent;
  let fixture: ComponentFixture<DetailsCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsCourseComponent],
      imports: [
        provideFirestore(() => getFirestore()),
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAuth(() => getAuth()),
        ],
          });
    fixture = TestBed.createComponent(DetailsCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
