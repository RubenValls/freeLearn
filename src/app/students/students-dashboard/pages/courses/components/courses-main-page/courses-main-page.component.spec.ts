import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { CoursesMainPageComponent } from './courses-main-page.component';
import { StudentsModule } from 'src/app/students/students.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Course } from 'src/app/admins/admins-dashboard/pages/courses/interface/course';
import { mostRatedTopic } from 'src/app/students/functions/most-rated';
import { of } from 'rxjs';

describe('CoursesMainPageComponent', () => {
  let component: CoursesMainPageComponent;
  let fixture: ComponentFixture<CoursesMainPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StudentsModule, BrowserAnimationsModule],
      declarations: [CoursesMainPageComponent],
      providers: [provideMockStore({ initialState: {} })],  
    });
    fixture = TestBed.createComponent(CoursesMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have no courses on initialization', () => {
    expect(component.courses.length).toEqual(0);
  });

  it('should filter courses by name', () => {
    const mockCourses: Course[] = [
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
    component.courses = mockCourses;
    component.name.setValue('Course2');
    expect(component.filteredCourses.length).toEqual(1);
    expect(component.filteredCourses[0].name).toEqual('Course2');
    component.name.setValue('');
    expect(component.filteredCourses.length).toEqual(2);
    expect(component.filteredCourses[0].name).toEqual('Course1');
  });

  it('should set topCourses', fakeAsync(() => {
    const data = [
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
    component.courses$ = of(data);

    component.ngOnInit();

    tick();

    expect(component.courses).toEqual(data);
    expect(component.topCourses).toEqual(mostRatedTopic([...data]) as Course[]);
  }));

  it('should return filtered courses if any', () => {
    const mockCourses: Course[] = [
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
    component.courses = mockCourses;
    component.name.setValue('Course1');
    expect(component.getCourses().length).toEqual(1);
    expect(component.getCourses()[0].name).toEqual('Course1');
  });

  it('should return all courses if no filter applied', () => {
    const mockCourses: Course[] = [
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
        name: 'Course1',
        description: 'Description1',
        instructorId: [{ id: '1', name: 'Instructor1' }],
        imageUrl: 'url1',
        techs: [{ id: '1', name: 'Tech1' }],
        lessons: [{ id: '1', name: 'Lesson1', videoUrl: 'url1' }],
        rating: [{ userId: '1', rating: 3 }],
        introductionURL: 'url1'
      },
    ];
    component.courses = mockCourses;
    expect(component.getCourses().length).toEqual(2);
  });

  it('should unsubscribe on destroy', () => {
    if (component.courseSubscription) {
      spyOn(component.courseSubscription, 'unsubscribe');
      component.ngOnDestroy();
      expect(component.courseSubscription.unsubscribe).toHaveBeenCalled();
    }
    else{
      expect(component.courseSubscription).toBeUndefined();
    }
  });
  

  describe('mostRatedTopic', () => {
    it('should return the top three rated courses', () => {
      const mockArray: Course[] = [
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
            { 
              id: '3',
              name: 'Course3',
              description: 'Description3',
              instructorId: [{ id: '3', name: 'Instructor3' }],
              imageUrl: 'url3',
              techs: [{ id: '3', name: 'Tech3' }],
              lessons: [{ id: '3', name: 'Lesson3', videoUrl: 'url3' }],
              rating: [{ userId: '3', rating: 5 }],
              introductionURL: 'url3'
            },
      ];
  
      const result = mostRatedTopic(mockArray);
  
      expect(result.length).toEqual(3);
      expect(result[0].name).toEqual('Course3');
      expect(result[1].name).toEqual('Course2');
      expect(result[2].name).toEqual('Course1');
    });
  });
  
});
