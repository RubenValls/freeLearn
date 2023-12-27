import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddCourseFormComponent } from './add-course-form.component';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { AdminsModule } from 'src/app/admins/admins.module';
import { CoursesService } from '../../service/courses.service';


describe('AddCourseFormComponent', () => {
  let component: AddCourseFormComponent;
  let fixture: ComponentFixture<AddCourseFormComponent>;
  let coursesService: jasmine.SpyObj<CoursesService>;
  beforeEach(() => {
    coursesService = jasmine.createSpyObj('CoursesService', ['addCourse']);

    TestBed.configureTestingModule({
      imports: [
        AdminsModule,
        provideFirestore(() => getFirestore()),
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAuth(() => getAuth()),
      ],
     
    });
    fixture = TestBed.createComponent(AddCourseFormComponent);
    component = fixture.componentInstance;   
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call addCourse when form is valid', () => {
    spyOn(component.coursesService, 'addCourse')

    component.courseForm.controls['name'].setValue('Test Course');
    component.courseForm.controls['description'].setValue('Test Description');
    component.courseForm.controls['instructorId'].setValue([{name: 'Midudev', id: '1'}, {name: 'Mouredev', id: '2'}]);
    component.courseForm.controls['techs'].setValue({name: 'Angular', id: '1234'}, {name: 'Typescript', id: '1234'});
    component.courseForm.controls['imageUrl'].setValue('test.jpg');
    component.courseForm.controls['rating'].setValue([{
      userId: '1',
      rating: '4'
    }]);  
    component.courseForm.controls['introductionURL'].setValue('http://example.com/intro');
    component.courseForm.controls['lessons'].setValue([{
      id: '1',
      name: 'Lesson 1',
      videoUrl: 'https://www.google.com' 
     }]);

    component.addCourse();

    // Verifica que addCourse haya sido llamado con el valor del formulario
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
