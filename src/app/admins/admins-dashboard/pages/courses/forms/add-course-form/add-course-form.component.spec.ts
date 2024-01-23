import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AddCourseFormComponent } from './add-course-form.component';
import { DocumentData, DocumentReference, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { AdminsModule } from 'src/app/admins/admins.module';
import { CoursesService } from '../../service/courses.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TechService } from '../../../technologies/service/tech.service';
import { InstructorsService } from '../../../instructors/instructors-service/instructors.service';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';
import { of } from 'rxjs';
import { provideMockStore } from '@ngrx/store/testing';


describe('AddCourseFormComponent', () => {
  let component: AddCourseFormComponent;
  let fixture: ComponentFixture<AddCourseFormComponent>;
  let coursesService: jasmine.SpyObj<CoursesService>;
  let techsService: jasmine.SpyObj<TechService>;
  let instructorsService: jasmine.SpyObj<InstructorsService>;
  let alertsService: jasmine.SpyObj<AlertsService>;
  
  beforeEach(() => {
    coursesService = jasmine.createSpyObj('CoursesService', ['addCourse']);
    techsService = jasmine.createSpyObj('TechService', ['getTechnologies']);
    instructorsService = jasmine.createSpyObj('InstructorsService', ['getInstructors']);
    alertsService = jasmine.createSpyObj('AlertsService', ['successMessage']);

    TestBed.configureTestingModule({
      imports: [
        AdminsModule,
        BrowserAnimationsModule,
        provideFirestore(() => getFirestore()),
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAuth(() => getAuth()),
      ],
      providers: [
        provideMockStore(),
        { provide: TechService, useValue: techsService },
        { provide: CoursesService, useValue: coursesService },
        { provide: InstructorsService, useValue: instructorsService },
        { provide: AlertsService, useValue: alertsService },
      ]
    });
    fixture = TestBed.createComponent(AddCourseFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have defined variables', () => {
    expect(component.closeForm).toBeDefined();
    expect(component.instructors$).toBeDefined();
    expect(component.techs$).toBeDefined();
    expect(component.instructors).toBeUndefined();
    expect(component.techs).toBeUndefined();
  });
  
  it('should initialize with technologies and instructors', () => {
    const techsSpy = spyOn(component.techs$, 'subscribe');
    const instructorsSpy = spyOn(component.instructors$, 'subscribe');

    component.ngOnInit();

    expect(techsSpy).toHaveBeenCalled();
    expect(instructorsSpy).toHaveBeenCalled();
  });

  it('should update techs selection', () => {
    const selectedTechs = [{ name: 'Angular', id: '1234' }, { name: 'Typescript', id: '1234' }];
    component.onSelectionChange({ value: selectedTechs }, 'techs');

    expect(component.courseForm.get('techs')?.value).toEqual(selectedTechs);
  });

  it('should update instructors selection', () => {
    const selectedInstructors = ['1', '2'];
    component.onSelectionChange({ value: selectedInstructors }, 'instructorId');

    expect(component.courseForm.get('instructorId')?.value).toEqual(selectedInstructors);
  });
  
  it('should call addCourse when form is valid', () => {

    component.courseForm.controls['name'].setValue('Test Course');
    component.courseForm.controls['description'].setValue('Test Description');
    component.courseForm.controls['instructorId'].setValue([{name: 'Midudev', id: '1'}, {name: 'Mouredev', id: '2'}]);
    component.courseForm.controls['techs'].setValue([{name: 'Angular', id: '1234'}, {name: 'Typescript', id: '1234'}]);
    component.courseForm.controls['imageUrl'].setValue('test.jpg');
    component.courseForm.controls['rating'].setValue([{
      userId: '1',
      rating: 4
    }]);  
    component.courseForm.controls['introductionURL'].setValue('http://example.com/intro');
    component.courseForm.controls['lessons'].setValue([{
      id: '1',
      name: 'Lesson 1',
      videoUrl: 'https://www.google.com' 
     }]);

    component.addCourse();

    expect(component.coursesService.addCourse).toHaveBeenCalledWith({
      name: 'Test Course',
      description:'Test Description',
      techs: [{name: 'Angular', id: '1234'}, {name: 'Typescript', id: '1234'}],
      instructorId: [{name: 'Midudev', id: '1'}, {name: 'Mouredev', id: '2'}], 
      imageUrl: 'test.jpg',
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
    });
  });

  it('should not call addCourse when form is valid', () => {

    component.courseForm.controls['name'].setValue(null);
    component.courseForm.controls['description'].setValue('Test Description');
    component.courseForm.controls['instructorId'].setValue([{name: 'Midudev', id: '1'}, {name: 'Mouredev', id: '2'}]);
    component.courseForm.controls['techs'].setValue([{name: 'Angular', id: '1234'}, {name: 'Typescript', id: '1234'}]);
    component.courseForm.controls['imageUrl'].setValue('test.jpg');
    component.courseForm.controls['rating'].setValue([{
      userId: '1',
      rating: 4
    }]);  
    component.courseForm.controls['introductionURL'].setValue('http://example.com/intro');
    component.courseForm.controls['lessons'].setValue([{
      id: '1',
      name: 'Lesson 1',
      videoUrl: 'https://www.google.com' 
     }]);

    component.addCourse();

    expect(component.coursesService.addCourse).not.toHaveBeenCalled()
  });

  it('should handle success when adding a course', () => {

    component.courseForm.controls['name'].setValue('Test Course');
    component.courseForm.controls['description'].setValue('Test Description');
    component.courseForm.controls['instructorId'].setValue([{name: 'Midudev', id: '1'}, {name: 'Mouredev', id: '2'}]);
    component.courseForm.controls['techs'].setValue([{name: 'Angular', id: '1234'}, {name: 'Typescript', id: '1234'}]);
    component.courseForm.controls['imageUrl'].setValue('test.jpg');
    component.courseForm.controls['rating'].setValue([{
      userId: '1',
      rating: 4
    }]);  
    component.courseForm.controls['introductionURL'].setValue('http://example.com/intro');
    component.courseForm.controls['lessons'].setValue([{
      id: '1',
      name: 'Lesson 1',
      videoUrl: 'https://www.google.com' 
     }]);

    component.addCourse();

    expect(alertsService.successMessage).toHaveBeenCalledWith('Course created successfully');
  });

  it('should not call addCourse when form is invalid', () => {
    // Set up form with invalid data (e.g., missing required fields)
    component.courseForm.setValue({
      name: null,
      description: 'Test Description',
      techs: [{ name: 'Angular', id: '1234' }, { name: 'Typescript', id: '1234' }],
      instructorId: [{ name: 'Midudev', id: '1' }, { name: 'Mouredev', id: '2' }],
      imageUrl: 'test.jpg',
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
    });
  
    // Spy on the reset method of the form
    const resetSpy = spyOn(component.courseForm, 'reset');
    const closeFormSpy = spyOn(component.closeForm, 'emit');
  
    // Trigger the addCourse function
    component.addCourse();
  
    // Expectations
    expect(resetSpy).not.toHaveBeenCalled();
    expect(closeFormSpy).not.toHaveBeenCalled();
  });
  
  
});
