import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TechPageComponent } from './tech-page.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth'
import { environment } from 'src/environments/environment';

describe('TechPageComponent', () => {
  let component: TechPageComponent;
  let fixture: ComponentFixture<TechPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TechPageComponent],
      imports: [
        provideFirestore(() => getFirestore()),
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAuth(() => getAuth()), 
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 'test' }),
            data: of({ data: { id: 'test' } })
          }
        }
      
      ],
    });
    fixture = TestBed.createComponent(TechPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
