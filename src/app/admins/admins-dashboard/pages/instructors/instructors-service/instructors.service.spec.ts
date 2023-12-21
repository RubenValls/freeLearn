
import { TestBed } from '@angular/core/testing';
import { InstructorsService } from './instructors.service';
import { Firestore, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { Instructor } from '../instructors';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';


fdescribe('InstructorsService', () => {
  let service: InstructorsService;

  const instructorData: Instructor = {
    id: '1',
    name: 'Instructor 1',
    socialMedia: {
        web: 'https://www.instructor1.com',
        youtube: 'https://www.youtube.com/instructor1',
        twitter: 'https://twitter.com/instructor1',
        linkedin: 'https://www.linkedin.com/in/instructor1',
    },
    courses: [],
};

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        provideFirestore(() => getFirestore()),
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAuth(() => getAuth()),
      ],
      providers: [
        InstructorsService
      ]
    });
    
    service = TestBed.inject(InstructorsService);
  });

  

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add an instructor', async () => { 
    spyOn(service, 'addInstructor')
    service.addInstructor(instructorData);
    expect(service.addInstructor).toHaveBeenCalled();  
  });

  it('should get instructors', () => {
    
  
  });

  it('should get an instructor by id', async () => {


  });

  it('should update an instructor', async () => {
    

  });

  it('should update an instructor\'s courses', async () => {
    
  });

  
  it('should delete an instructor', async () => {
    
  });


});

