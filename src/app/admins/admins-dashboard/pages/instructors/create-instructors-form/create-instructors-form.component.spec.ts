import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInstructorsFormComponent } from './create-instructors-form.component';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { InstructorsService } from '../instructors-service/instructors.service';
import { AdminsModule } from 'src/app/admins/admins.module';
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
    imagePath: 'path/to/image', // Add this property
    rating: [{
      userId: '1',
      rating: 4
    }], 
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
  
  it('should not call addInstructor or successMessage if the form is invalid', () => {
    const addInstructorSpy = spyOn(service, 'addInstructor');
    const successMessageSpy = spyOn(alerts, 'successMessage');
   
    component.instructorForm.controls['name'].setValue('');
  
    component.addInstructor();
  
    expect(addInstructorSpy).not.toHaveBeenCalled();
    expect(successMessageSpy).not.toHaveBeenCalled();
  });

});
