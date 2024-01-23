import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesSectionComponent } from './courses-section.component';
import { StudentsModule } from 'src/app/students/students.module';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth'
import { environment } from 'src/environments/environment';
import { CoursesService } from 'src/app/admins/admins-dashboard/pages/courses/service/courses.service';
import { of } from 'rxjs';
import { Course } from 'src/app/admins/admins-dashboard/pages/courses/interface/course';

describe('CoursesSectionComponent', () => {
  let component: CoursesSectionComponent;
  let fixture: ComponentFixture<CoursesSectionComponent>;
  let coursesService: CoursesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesSectionComponent],
      imports: [
        StudentsModule,
        provideFirestore(() => getFirestore()),
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAuth(() => getAuth()),
      ],
      providers: [
        { provide: CoursesService, useValue: { getTopicCourses: () => of([]) } }
      ]
    });
    fixture = TestBed.createComponent(CoursesSectionComponent);
    component = fixture.componentInstance;
    coursesService = TestBed.inject(CoursesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getTopicCourses on ngOnInit if courses are defined', () => {
    spyOn(coursesService, 'getTopicCourses');
    component.courses = ['course1', 'course2'];
    component.ngOnInit();
    expect(coursesService.getTopicCourses).toHaveBeenCalledWith(component.courses);
  });

  it('should not call getTopicCourses on ngOnInit if courses are undefined', () => {
    spyOn(coursesService, 'getTopicCourses');
    component.courses = undefined;
    component.ngOnInit();
    expect(coursesService.getTopicCourses).not.toHaveBeenCalled();
  });

  it('should initialize instructorCourses to an empty array on creation', () => {
    expect(component.instructorCourses).toEqual([]);
  });
  
  it('should call getTopicCourses on ngOnInit if courses are defined and not empty', async () => {
    const courses = ['course1', 'course2'];
    spyOn(coursesService, 'getTopicCourses').and.returnValue(Promise.resolve([]));
    component.courses = courses;
    await component.ngOnInit();
    expect(coursesService.getTopicCourses).toHaveBeenCalledWith(courses);
    expect(component.instructorCourses).toEqual([]);
  });
  
  it('should not call getTopicCourses on ngOnInit if courses are undefined', async () => {
    spyOn(coursesService, 'getTopicCourses');
    component.courses = undefined;
    await component.ngOnInit();
    expect(coursesService.getTopicCourses).not.toHaveBeenCalled();
    expect(component.instructorCourses).toEqual([]);
  });
  
  it('should not call getTopicCourses on ngOnInit if courses are an empty array', async () => {
    spyOn(coursesService, 'getTopicCourses');
    component.courses = [];
    await component.ngOnInit();
    expect(coursesService.getTopicCourses).not.toHaveBeenCalled();
    expect(component.instructorCourses).toEqual([]);
  });
  
  it('should set instructorCourses to the result of getTopicCourses on successful API call', async () => {
    const courses = ['course1', 'course2'];
    const mockCourseData: Course[] = [
      { 
        id: '1',
        name: 'Course1',
        description: 'Description1',
        instructorId: [{ id: '1', name: 'Instructor1' }],
        imageUrl: 'url1',
        techs: [{ id: '1', name: 'Tech1' }],
        lessons: [{ id: '1', name: 'Lesson1', videoUrl: 'url1' }],
        rating: [{ userId: '1', rating: 3 }],
        introductionURL: 'url1'
      },
      { 
        id: '1',
        name: 'Course2',
        description: 'Description1',
        instructorId: [{ id: '1', name: 'Instructor1' }],
        imageUrl: 'url1',
        techs: [{ id: '1', name: 'Tech1' }],
        lessons: [{ id: '1', name: 'Lesson1', videoUrl: 'url1' }],
        rating: [{ userId: '1', rating: 3 }],
        introductionURL: 'url1'
      },
    ];
  
    spyOn(coursesService, 'getTopicCourses').and.returnValue(Promise.resolve(mockCourseData));
    component.courses = courses;
    await component.ngOnInit();
    expect(coursesService.getTopicCourses).toHaveBeenCalledWith(courses);
    expect(component.instructorCourses).toEqual(mockCourseData);
  });
  
  it('should log an error and set instructorCourses to an empty array on failed API call', async () => {
    const courses = ['course1', 'course2'];
    const mockError = new Error('API Error');
  
    spyOn(coursesService, 'getTopicCourses').and.returnValue(Promise.reject(mockError));
    spyOn(console, 'error');
  
    component.courses = courses;
    await component.ngOnInit();
  
    expect(coursesService.getTopicCourses).toHaveBeenCalledWith(courses);
    expect(console.error).toHaveBeenCalledWith(mockError);
    expect(component.instructorCourses).toEqual([]);
  });

  it('should set instructorCourses to an empty array on ngOnInit if courses are undefined', async () => {
    spyOn(coursesService, 'getTopicCourses');
    component.courses = undefined;
    await component.ngOnInit();
    expect(coursesService.getTopicCourses).not.toHaveBeenCalled();
    expect(component.instructorCourses).toEqual([]);
  });
  
  it('should set instructorCourses to an empty array on ngOnInit if courses are an empty array', async () => {
    spyOn(coursesService, 'getTopicCourses');
    component.courses = [];
    await component.ngOnInit();
    expect(coursesService.getTopicCourses).not.toHaveBeenCalled();
    expect(component.instructorCourses).toEqual([]);
  });
  
  it('should log an error and set instructorCourses to an empty array on failed API call', async () => {
    const courses = ['course1', 'course2'];
    const mockError = new Error('API Error');
  
    spyOn(coursesService, 'getTopicCourses').and.returnValue(Promise.reject(mockError));
    spyOn(console, 'error');
  
    component.courses = courses;
    await component.ngOnInit();
  
    expect(coursesService.getTopicCourses).toHaveBeenCalledWith(courses);
    expect(console.error).toHaveBeenCalledWith(mockError);
    expect(component.instructorCourses).toEqual([]);
  });
  
  it('should set instructorCourses to an empty array on successful API call with empty result', async () => {
    const courses = ['course1', 'course2'];
  
    spyOn(coursesService, 'getTopicCourses').and.returnValue(Promise.resolve([]));
    component.courses = courses;
    await component.ngOnInit();
  
    expect(coursesService.getTopicCourses).toHaveBeenCalledWith(courses);
    expect(component.instructorCourses).toEqual([]);
  });
  
  it('should set instructorCourses to the result of getTopicCourses on successful API call with non-empty result', async () => {
    const courses = ['course1', 'course2'];
    const mockCourseData: Course[] = [
      { 
        id: '1',
        name: 'Course1',
        description: 'Description1',
        instructorId: [{ id: '1', name: 'Instructor1' }],
        imageUrl: 'url1',
        techs: [{ id: '1', name: 'Tech1' }],
        lessons: [{ id: '1', name: 'Lesson1', videoUrl: 'url1' }],
        rating: [{ userId: '1', rating: 3 }],
        introductionURL: 'url1'
      },
      { 
        id: '2',
        name: 'Course2',
        description: 'Description2',
        instructorId: [{ id: '2', name: 'Instructor2' }],
        imageUrl: 'url2',
        techs: [{ id: '2', name: 'Tech2' }],
        lessons: [{ id: '2', name: 'Lesson2', videoUrl: 'url2' }],
        rating: [{ userId: '2', rating: 4 }],
        introductionURL: 'url2'
      },
    ];
  
    spyOn(coursesService, 'getTopicCourses').and.returnValue(Promise.resolve(mockCourseData));
    component.courses = courses;
    await component.ngOnInit();
  
    expect(coursesService.getTopicCourses).toHaveBeenCalledWith(courses);
    expect(component.instructorCourses).toEqual(mockCourseData);
  });
  
  
});
