import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AddCourseFormComponent } from './add-course-form.component';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
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

    techsService.getTechnologies.and.returnValue(of([]));
    instructorsService.getInstructors.and.returnValue(of([]));

    TestBed.configureTestingModule({
      imports: [
        AdminsModule,
        BrowserAnimationsModule,
        provideFirestore(() => getFirestore()),
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAuth(() => getAuth()),
      ],
      providers: [
        { provide: TechService, useValue: techsService },
        { provide: CoursesService, useValue: coursesService },
        { provide: InstructorsService, useValue: instructorsService },
        { provide: AlertsService, useValue: alertsService },
      ]
    });
    fixture = TestBed.createComponent(AddCourseFormComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should initialize with technologies and instructors', () => {
    expect(techsService.getTechnologies).toHaveBeenCalled();
    expect(instructorsService.getInstructors).toHaveBeenCalled();
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


});
