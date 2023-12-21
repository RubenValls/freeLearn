import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInstructorsFormComponent } from './create-instructors-form.component';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { InstructorsService } from '../instructors-service/instructors.service';
import { AdminsModule } from 'src/app/admins/admins.module';
import { of } from 'rxjs';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';
import { Instructor } from '../instructors';

describe('InstructorsFormComponent', () => {
  let component: CreateInstructorsFormComponent;
  let fixture: ComponentFixture<CreateInstructorsFormComponent>;
  let service: InstructorsService;
  let alerts: AlertsService

  const instructorData: Instructor = {
    id: '1',
    name: 'Instructor 1',
    socialMedia: {
      web: 'https://www.instructor1.com',
      youtube: 'https://www.youtube.com/instructor1',
      twitter: 'https://twitter.com/instructor1',
      linkedin: 'https://www.linkedin.com/in/instructor1',
    },
    courses: [],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AdminsModule,
        provideFirestore(() => getFirestore()),
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAuth(() => getAuth()),
      ],
      providers: [InstructorsService,
      AlertsService],
    });

    fixture = TestBed.createComponent(CreateInstructorsFormComponent);
    component = fixture.componentInstance;

    service = TestBed.inject(InstructorsService);  
    alerts = TestBed.inject(AlertsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with the correct structure', () => {
    const form = component.instructorForm;
    expect(form.get('name')).toBeTruthy();
    expect(form.get('socialMedia.web')).toBeTruthy();
    expect(form.get('socialMedia.youtube')).toBeTruthy();
    expect(form.get('socialMedia.twitter')).toBeTruthy();
    expect(form.get('socialMedia.linkedin')).toBeTruthy();
    expect(form.get('courses')).toBeTruthy();
  });

  it('should have a valid form initially', () => {
    const form = component.instructorForm;
    const nameControl = form.get('name');

    if (nameControl) {
        expect(form.valid).toBeFalsy(); 
        expect(nameControl.hasError('required')).toBeTruthy(); 
    } else {
        fail('Name control is null'); 
    }
  });

  

  it('should call successMessage on successful form submission', () => {
    spyOn(service, 'addInstructor');
  spyOn(alerts, 'successMessage');

  service.addInstructor(instructorData);
  component.onSubmit();

  expect(alerts.successMessage).toHaveBeenCalledWith('Instructor created successfully');
  });

  // it('should not call addInstructor method on invalid form submission', () => {
  //   component.instructorForm.get('name').setValue(''); 
  //   const addInstructorSpy = service.addInstructor.and.returnValue(of({}));
  //   component.onSubmit();
  //   expect(addInstructorSpy).not.toHaveBeenCalled();
  // });

});
