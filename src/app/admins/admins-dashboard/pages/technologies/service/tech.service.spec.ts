import { TestBed } from '@angular/core/testing';

import { TechService } from './tech.service';
import { AdminsModule } from 'src/app/admins/admins.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { DocumentData, DocumentReference, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { TechnologyType } from '../types/technologies';
import { of } from 'rxjs';

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
    const mockDocRef: DocumentReference<DocumentData> = technology as unknown as DocumentReference<DocumentData>;
    spyOn(service, 'addTechnology').and.returnValue(Promise.resolve(mockDocRef));
    
    const newTech = await service.addTechnology(technology);
    
    expect(service.addTechnology).toHaveBeenCalledWith(technology);
    expect(newTech).toBeTruthy();
  });

  it('should get technologies', async () => {
    const collectionData = await service.getTechnologies();

    expect(collectionData).toBeTruthy();
  })

  it('should get technologies by Id', async () => {
    const id = '1';
    const fakeTechnology: TechnologyType = {
      id: '1',
      name: 'Angular',
      imagePath: 'path/to/image',
      description: 'A platform for building web applications.',
      courses: []
    };

  spyOn(service, 'getTechnologyById').and.returnValue(Promise.resolve(fakeTechnology));

  const functionresult = await service.getTechnologyById(id);

  expect(service.getTechnologyById).toHaveBeenCalledWith(id);
  expect(functionresult).toBeTruthy();
  })

  it('should get technologies by CourseId', async () => {
    const id = '1';
    const fakeTechnologyByCourse: TechnologyType[] = [{
      id: '1',
      name: 'Angular',
      imagePath: 'path/to/image',
      description: 'A platform for building web applications.',
      courses: []
    }];

    spyOn(service, 'getTechnologyByCourseId').and.returnValue(Promise.resolve(of(fakeTechnologyByCourse)));

    const functionresult = await service.getTechnologyByCourseId(id);

    expect(service.getTechnologyByCourseId).toHaveBeenCalledWith(id);
    expect(functionresult).toBeTruthy();
  })

  it('returns an empty array when courseId is not provided', async () => {
    (await service.getTechnologyByCourseId('')).subscribe(result => {
      expect(result).toEqual([]);
    });
  });

  it('returns true if technology is in Database', async () => {
    const id = '1';

    spyOn(service, 'isTechnologyInDatabase').and.returnValue(Promise.resolve(true));

    const functionresult = await service.isTechnologyInDatabase(id);

    expect(service.isTechnologyInDatabase).toHaveBeenCalledWith(id);
    expect(functionresult).toBeTrue();
  });

  it('returns false if technology is not Database', async () => {
    const id = '1';

    spyOn(service, 'isTechnologyInDatabase').and.returnValue(Promise.resolve(false));

    const functionresult = await service.isTechnologyInDatabase(id);

    expect(service.isTechnologyInDatabase).toHaveBeenCalledWith(id);
    expect(functionresult).toBeFalse();
  });

  it('should update a technology', async () => {
    const id = '1';
    const fakeTechnology: TechnologyType = {
      id: '1',
      name: 'Angular',
      imagePath: 'path/to/image',
      description: 'A platform for building web applications.',
      courses: []
    };

    spyOn(service, 'updateTechnology').and.returnValue(Promise.resolve());

    const functionresult = await service.updateTechnology(id, fakeTechnology);

    expect(service.updateTechnology).toHaveBeenCalledWith(id, fakeTechnology);
    expect(functionresult).toBeUndefined();
  })

  it('should update a technology courses', async () => {
    const id = '1';
    const newCourseId = '1'

    spyOn(service, 'updateTechnologyCourses').and.returnValue(Promise.resolve());

    const functionresult = await service.updateTechnologyCourses(id, newCourseId);

    expect(service.updateTechnologyCourses).toHaveBeenCalledWith(id, newCourseId);
    expect(functionresult).toBeUndefined();
  })

  it('should delete a technology courses', async () => {
    const id = '1';
    const newCourseId = '1'

    spyOn(service, 'deleteTechnologyCourses').and.returnValue(Promise.resolve());

    const functionresult = await service.deleteTechnologyCourses(id, newCourseId);

    expect(service.deleteTechnologyCourses).toHaveBeenCalledWith(id, newCourseId);
    expect(functionresult).toBeUndefined();
  })

  it('should delete a technology', async () => {
    const id = '1';

    spyOn(service, 'deleteTechDoc').and.returnValue(Promise.resolve());

    const functionresult = await service.deleteTechDoc(id);

    expect(service.deleteTechDoc).toHaveBeenCalledWith(id);
    expect(functionresult).toBeUndefined();
  })

  
});
