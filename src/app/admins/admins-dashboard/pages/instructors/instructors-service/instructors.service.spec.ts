
import { TestBed } from '@angular/core/testing';
import { InstructorsService } from './instructors.service';
import { Firestore } from '@angular/fire/firestore';
import { Instructor } from '../instructors';
import { of } from 'rxjs';

describe('InstructorsService', () => {
  let service: InstructorsService;
  let firestoreMock: any; 

  const instructorData: Instructor = {
    id: '1',
    name: 'Instructor 1',
    socialMedia: {
        web: 'https://www.instructor1.com',
        youtube: 'https://www.youtube.com/instructor1',
        twitter: 'https://twitter.com/instructor1',
        linkedin: 'https://www.linkedin.com/in/instructor1',
    },
    courses: ["curos 1", "curso 2"],
};

  beforeEach(() => {
    firestoreMock = jasmine.createSpyObj('Firestore', ['collection', 'doc', 'addDoc', 'getDoc', 'updateDoc', 'deleteDoc']);
    TestBed.configureTestingModule({
      providers: [
        InstructorsService,
        { provide: Firestore, useValue: firestoreMock },
      ],
    });
    service = TestBed.inject(InstructorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add an instructor', async () => { 

    const docRef = { id: 'course-id' };
    firestoreMock.collection.and.returnValue({});
    firestoreMock.addDoc.and.returnValue(Promise.resolve(docRef));

    await service.addInstructor(instructorData);

    expect(firestoreMock.collection).toHaveBeenCalledWith('instructors');
    expect(firestoreMock.addDoc).toHaveBeenCalledWith({}, instructorData);

  });

  it('should get instructors', () => {
    firestoreMock.collection.and.returnValue({});
    firestoreMock.getDoc.and.returnValue(Promise.resolve({ data: () => instructorData }));

    const result = service.getInstructors();

    expect(firestoreMock.collection).toHaveBeenCalledWith('instructors');
    expect(result).toEqual(of(instructorData));   
  
  });

  it('should get an instructor by id', async () => {

    const id = 'sample-id';
    
    firestoreMock.doc.and.returnValue({});
    firestoreMock.getDoc.and.returnValue(Promise.resolve({ data: () => instructorData }));
    
    const result = await service.getInstructorById(id);

    expect(firestoreMock.doc).toHaveBeenCalledWith('instructors', id);
    expect(result).toEqual(instructorData);

  });

  it('should update an instructor', async () => {
    const id = 'sample-id';
    firestoreMock.doc.and.returnValue({});
    firestoreMock.updateDoc.and.returnValue(Promise.resolve());

    service.updateInstructor(id, instructorData);

    expect(firestoreMock.doc).toHaveBeenCalledWith('instructors', id);
    expect(firestoreMock.updateDoc).toHaveBeenCalledWith({}, { instructorData });

  });

  it('should update an instructor\'s courses', async () => {
    const technologyId = 'sample-technology-id';
    const courseId = 'sample-course-id';
    const instructorRefMock = jasmine.createSpyObj('instructorRef', ['data']);
  
  
    firestoreMock.doc.and.returnValue(instructorRefMock);
    firestoreMock.getDoc.and.returnValue(Promise.resolve({ data: () => instructorData }));
    firestoreMock.updateDoc.and.returnValue(Promise.resolve());
  
    await service.updateInstructorsCourses(technologyId, courseId);
  
    expect(firestoreMock.doc).toHaveBeenCalledWith('instructors', technologyId);
    expect(firestoreMock.getDoc).toHaveBeenCalledWith(instructorRefMock);
    expect(instructorData.courses).toContain(courseId);
    expect(firestoreMock.updateDoc).toHaveBeenCalledWith(instructorRefMock, {
      courses: instructorData.courses,
    });
  });

  
  it('should delete an instructor', async () => {
    const id = 'sample-id';

    firestoreMock.doc.and.returnValue({});
    firestoreMock.deleteDoc.and.returnValue(Promise.resolve());

    service.deleteInstructor(id);

    expect(firestoreMock.doc).toHaveBeenCalledWith('instructors', id);
    expect(firestoreMock.deleteDoc).toHaveBeenCalledWith({});
  });
});

