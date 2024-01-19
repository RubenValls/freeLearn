import { TestBed } from '@angular/core/testing';

import { TechService } from './tech.service';
import { AdminsModule } from 'src/app/admins/admins.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { Firestore, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { TechnologyType } from '../types/technologies';

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

  it('should add a technology', async () => {
    const technology: TechnologyType = {
      id: '1',
      name: 'Angular',
      imagePath: 'path/to/image',
      description: 'A platform for building web applications.',
      courses: []
    };
    spyOn(service, 'addTechnology').and.callThrough();
    
    const newTech = await service.addTechnology(technology);
    
    expect(service.addTechnology).toHaveBeenCalledWith(technology);
    expect(newTech).toBeTruthy();
  });

});
