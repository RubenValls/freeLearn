import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddCourseFormComponent } from './add-course-form.component';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { AdminsModule } from 'src/app/admins/admins.module';
import { CoursesService } from '../../service/courses.service';
import { of } from 'rxjs';

fdescribe('AddCourseFormComponent', () => {
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
    component.courseForm.controls['instructorId'].setValue(['1', '2']);
    component.courseForm.controls['techs'].setValue(['Angular', 'TypeScript']);
    component.courseForm.controls['imageUrl'].setValue('test.jpg');
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
      techs: ['Angular', 'TypeScript'],
      instructorId: ['1', '2'], 
      imageUrl: 'test.jpg',
      lessons: [{
         id: '1',
         name: 'Lesson 1',
         videoUrl: 'https://www.google.com' 
        }]
    });
  });
});
