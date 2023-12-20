import { TestBed } from '@angular/core/testing';
import { CoursesService } from './courses.service';
import { Firestore } from '@angular/fire/firestore'; // Replace with the actual Firestore library import
import { TechService } from '../../technologies/service/tech.service';
import { InstructorsService } from '../../instructors/instructors-service/instructors.service';

import { of } from 'rxjs';

describe('CoursesService', () => {
  let service: CoursesService;
  let firestoreMock: any;
  let techsServiceMock: any;
  let instructorsServiceMock: any;

  const course = 
    { id: '1', 
    name: 'Course 1',
    description:'Course 1',   
    techs: ['Tech 1'],
    instructorId: ['Instructor 1'], 
    imageUrl: 'https://www.google.com',
    lessons: [{
       id: '1',
       name: 'Lesson 1',
       videoUrl: 'https://www.google.com' 
      }]};

  beforeEach(() => {
    firestoreMock = jasmine.createSpyObj('Firestore', ['collection', 'doc', 'addDoc', 'getDoc', 'updateDoc', 'deleteDoc']);
    techsServiceMock = jasmine.createSpyObj('TechService', ['updateTechnologyCourses']);
    instructorsServiceMock = jasmine.createSpyObj('InstructorsService', ['updateInstructorsCourses']);

    TestBed.configureTestingModule({
      providers: [
        CoursesService,
        { provide: Firestore, useValue: firestoreMock },
        { provide: TechService, useValue: techsServiceMock },
        { provide: InstructorsService, useValue: instructorsServiceMock }
      ]
    });

    service = TestBed.inject(CoursesService);
  });

  it('should add a course', async () => {
   
      
    const docRef = { id: 'course-id' };
    firestoreMock.collection.and.returnValue({});
    firestoreMock.addDoc.and.returnValue(Promise.resolve(docRef));

    await service.addCourse(course);

    expect(firestoreMock.collection).toHaveBeenCalledWith('courses');
    expect(firestoreMock.addDoc).toHaveBeenCalledWith({}, course);
    expect(techsServiceMock.updateTechnologyCourses).toHaveBeenCalledWith('Tech 1', 'course-id');
    expect(instructorsServiceMock.updateInstructorsCourses).toHaveBeenCalledWith('Instructor 1', 'course-id');
  });

  it('should get courses', () => {
    const courses = [{ id: '1', name: 'Course 1' }, { id: '2', name: 'Course 2' }];
    firestoreMock.collection.and.returnValue({});
    firestoreMock.getDoc.and.returnValue({ data: () => courses });

    const result = service.getCourses();

    expect(firestoreMock.collection).toHaveBeenCalledWith('courses');
    expect(result).toEqual(of(courses));
  });

  it('should get a course by id', async () => {
    const courseId = '1';
    
    firestoreMock.doc.and.returnValue({});
    firestoreMock.getDoc.and.returnValue(Promise.resolve({ data: () => course }));

    const result = await service.getCourseById(courseId);

    expect(firestoreMock.doc).toHaveBeenCalledWith('courses', courseId);
    expect(result).toEqual(course);
  });

  it('should update a course', () => {
    const courseId = '1';
   
    firestoreMock.doc.and.returnValue({});
    firestoreMock.updateDoc.and.returnValue(Promise.resolve());

    service.updateCourse(courseId, course);

    expect(firestoreMock.doc).toHaveBeenCalledWith('courses', courseId);
    expect(firestoreMock.updateDoc).toHaveBeenCalledWith({}, { course });
  });

  it('should delete a course', () => {
    const courseId = '1';
    firestoreMock.doc.and.returnValue({});
    firestoreMock.deleteDoc.and.returnValue(Promise.resolve());

    service.deleteCourse(courseId);

    expect(firestoreMock.doc).toHaveBeenCalledWith('courses', courseId);
    expect(firestoreMock.deleteDoc).toHaveBeenCalledWith({});
  });
});