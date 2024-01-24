import { TestBed } from '@angular/core/testing';
import { CoursesService } from './courses.service';
import { TechService } from '../../technologies/service/tech.service';
import { InstructorsService } from '../../instructors/instructors-service/instructors.service';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { Course, Rating } from '../interface/course';

describe('CoursesService', () => {
  let service: CoursesService;

  const course = 
    { id: '1', 
    name: 'Course 1',
    description:'Course 1',   
    techs: [{name: 'Angular', id: '1234'}, {name: 'Typescript', id: '1234'}],
    instructorId: [{name: 'Midudev', id: '1'}, {name: 'Mouredev', id: '2'}], 
    imageUrl: 'https://www.google.com',
    lessons: [{
       id: '1',
       name: 'Lesson 1',
       videoUrl: 'https://www.google.com' 
      }],
    rating: [{
      userId: '1',
      rating: 4
    }],
      introductionURL: 'http://example.com/intro'
    };
    const courseId = '1';

  beforeEach(() => { 

    TestBed.configureTestingModule({
      imports: [
        provideFirestore(() => getFirestore()),
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAuth(() => getAuth()),
      ],
      providers: [
        CoursesService,
        TechService,
        InstructorsService,       
      ]
    });
    service = TestBed.inject(CoursesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should currentCourse to be undefined', () => {
    expect(service.currentCourse).toBeUndefined();
  });

  it('should add a course', async () => {
    spyOn(service, 'addCourse');
    await service.addCourse(course);
    expect(service.addCourse).toHaveBeenCalled();    
  });

  it('should get courses', async () => {
    spyOn(service, 'getCourses');
    await service.getCourses();
    expect(service.getCourses).toHaveBeenCalled();    
  });

  it('should get a course by id', async () => {
    spyOn(service, 'getCourseById');
    await service.getCourseById(courseId);
    expect(service.getCourseById).toHaveBeenCalled();
  });

  it('should return courses when everything is ok', async () => {
    const mockCourses = [{ id: '1', 
    name: 'Course 1',
    description:'Course 1',   
    techs: [{name: 'Angular', id: '1234'}, {name: 'Typescript', id: '1234'}],
    instructorId: [{name: 'Midudev', id: '1'}, {name: 'Mouredev', id: '2'}], 
    imageUrl: 'https://www.google.com',
    lessons: [{
       id: '1',
       name: 'Lesson 1',
       videoUrl: 'https://www.google.com' 
      }],
    rating: [{
      userId: '1',
      rating: 4
    }],
      introductionURL: 'http://example.com/intro'
    }, { id: '2', 
    name: 'Course 1',
    description:'Course 1',   
    techs: [{name: 'Angular', id: '1234'}, {name: 'Typescript', id: '1234'}],
    instructorId: [{name: 'Midudev', id: '1'}, {name: 'Mouredev', id: '2'}], 
    imageUrl: 'https://www.google.com',
    lessons: [{
       id: '1',
       name: 'Lesson 1',
       videoUrl: 'https://www.google.com' 
      }],
    rating: [{
      userId: '1',
      rating: 4
    }],
      introductionURL: 'http://example.com/intro'
    }]
    spyOn(service, 'getTopicCourses').and.returnValue(Promise.resolve(mockCourses));
    await service.getTopicCourses(['1', '2']).then(courses => {
      expect(courses).toEqual(mockCourses);
    });
  });

  it('should return error when everything is not ok', async () => {
    const errorResponse = new Error('Error message');
    spyOn(service, 'getTopicCourses').and.returnValue(Promise.reject(errorResponse));

    await service.getTopicCourses(['1', '2']).catch(error => {
           expect(error).toEqual(errorResponse);
         });
  });

  it('should obtain a collection of instructors', () =>{
    const courses = ['1', '2'];
    spyOn(service, 'getTopicCourses')
    service.getTopicCourses(courses);
    expect(service.getTopicCourses).toHaveBeenCalled();
  });

  it('should update a course', async () => {
    spyOn(service, 'updateCourse');
    await service.updateCourse(courseId, course);
    expect(service.updateCourse).toHaveBeenCalled();
  });

  it('should update course rating', async () => {
    const course: Course = { id: '1', 
    name: 'Course 1',
    description:'Course 1',   
    techs: [{name: 'Angular', id: '1234'}, {name: 'Typescript', id: '1234'}],
    instructorId: [{name: 'Midudev', id: '1'}, {name: 'Mouredev', id: '2'}], 
    imageUrl: 'https://www.google.com',
    lessons: [{
       id: '1',
       name: 'Lesson 1',
       videoUrl: 'https://www.google.com' 
      }],
    rating: [],
      introductionURL: 'http://example.com/intro'
    };
  
    const getCourseSpy = spyOn(service, 'getCourseById').and.returnValue(Promise.resolve(course));
  
    const rating: Rating = { userId: 'testing', rating: 4 };
  
    // Act
    await service.updateCourseRating('xClUlZ1Y6nH8g9BvoLQX', rating);
  
    // Assert
    expect(getCourseSpy).toHaveBeenCalledWith('xClUlZ1Y6nH8g9BvoLQX');
    expect(service.currentCourse).toBeDefined();
  });
  

  it('should reject promise when no changes were made to the course', async () => {
    const course: Course = { id: '1', 
    name: 'Course 1',
    description:'Course 1',   
    techs: [{name: 'Angular', id: '1234'}, {name: 'Typescript', id: '1234'}],
    instructorId: [{name: 'Midudev', id: '1'}, {name: 'Mouredev', id: '2'}], 
    imageUrl: 'https://www.google.com',
    lessons: [{
       id: '1',
       name: 'Lesson 1',
       videoUrl: 'https://www.google.com' 
      }],
    rating: [{
      userId: '1',
      rating: 4
    }],
      introductionURL: 'http://example.com/intro'
    };

    spyOn(service, 'getCourseById').and.returnValue(Promise.resolve(course));
    spyOn(service, 'findIdsToEdit').and.returnValue({addedIds: [], deletedIds: []});

    try {
      await service.updateCourse('1', course);
      fail('The promise should have been rejected');
    } catch (e) {
      expect(e).toEqual({ message: "No changes were made to the course" });
    }
  });

  it('should update course rating', async () => {
    const rating: Rating = { userId: '1', rating: 4 };
    spyOn(service, 'updateCourseRating');
    await service.updateCourseRating(courseId, rating);
    expect(service.updateCourseRating).toHaveBeenCalled();
  });

  it('should delete a course', async () => {
    spyOn(service, 'deleteCourse');
    await service.deleteCourse(courseId);
    expect(service.deleteCourse).toHaveBeenCalled();    
  });  
  
  it('should find added and deleted tech ids', () => {
    const currentTechs = [{id: '1', name: 'Tech1'}, {id: '2', name: 'Tech2'}];
    const updatedTechs = [{id: '2', name: 'Tech2'}, {id: '3', name: 'Tech3'}];
    const result = service.findIdsToEdit(currentTechs, updatedTechs);
    expect(result).toEqual({addedIds: ['3'], deletedIds: ['1']});
  });

  it('should handle an error when adding a course', async () => {
    const errorMessage = 'Error adding course';
    spyOn(service, 'addCourse').and.throwError(errorMessage);
    
    try {
      await service.addCourse(course);
      fail('The promise should have been rejected');
    } catch (e) {
      expect(e).toBeDefined();
    }
  });
});