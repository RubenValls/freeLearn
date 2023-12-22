import { TestBed } from '@angular/core/testing';

import { TechService } from './tech.service';
import { AdminsModule } from 'src/app/admins/admins.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

describe('TechService', () => {
  let service: TechService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AdminsModule,
        provideFirestore(() => getFirestore()),
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAuth(() => getAuth()),
      ]
    });
    service = TestBed.inject(TechService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
