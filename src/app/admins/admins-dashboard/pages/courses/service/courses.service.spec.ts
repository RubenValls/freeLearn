import { TestBed } from '@angular/core/testing';
import { CoursesService } from './courses.service';
import { TechService } from '../../technologies/service/tech.service';
import { InstructorsService } from '../../instructors/instructors-service/instructors.service';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

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

  it('should add a course', () => {
    spyOn(service, 'addCourse')
    service.addCourse(course);
    expect(service.addCourse).toHaveBeenCalled();    
  });
  
  it('should get courses', () => {
    spyOn(service, 'getCourses')
    service.getCourses();
    expect(service.getCourses).toHaveBeenCalled();    
  });

  it('should get a course by id', () =>{   
    spyOn(service, 'getCourseById')
    service.getCourseById(courseId);
    expect(service.getCourseById).toHaveBeenCalled();
  });

  it('should update a course', () => {   
    spyOn(service, 'updateCourse')
    service.updateCourse(courseId, course);
    expect(service.updateCourse).toHaveBeenCalled();
  });

  it('should delete a course', () => { 
    spyOn(service, 'deleteCourse')
    service.deleteCourse(courseId);
    expect(service.deleteCourse).toHaveBeenCalled();    
  });  
});