import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorPageComponent } from './instructor-page.component';
import { StudentsModule } from 'src/app/students/students.module';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth'
import { environment } from 'src/environments/environment';
import { InstructorsService } from 'src/app/admins/admins-dashboard/pages/instructors/instructors-service/instructors.service';
import { UsersService } from 'src/app/shared/services/users/users.service';

describe('InstructorPageComponent', () => {
  let component: InstructorPageComponent;
  let fixture: ComponentFixture<InstructorPageComponent>;
  let instructorsService: InstructorsService;
  let usersService: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorPageComponent],
      imports: [
        StudentsModule,
        provideFirestore(() => getFirestore()),
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAuth(() => getAuth()),
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { 
          paramMap: of({ get: () => '123' }),
          data: of({ data: {
            id: '1',
            name: 'John Doe',
            socialMedia: {
              web: 'www.johndoe.com',
              youtube: 'www.youtube.com/johndoe',
              twitter: 'www.twitter.com/johndoe',
              linkedin: 'www.linkedin.com/in/johndoe',
            },
            courses: ['Course 1', 'Course 2'],
            imagePath: 'path/to/image',
            rating: [
              { userId: 'user1', rating: 5 },
              { userId: 'user2', rating: 4 },
            ],
          } }) 
        } },
        { provide: InstructorsService, useValue: { updateInstructorsRating: () => Promise.resolve({}) } },
        { provide: UsersService, useValue: { getUserFromStorage: () => ({ id: 'user1' }) } },
      ]
    });
    fixture = TestBed.createComponent(InstructorPageComponent);
    component = fixture.componentInstance;
    instructorsService = TestBed.inject(InstructorsService);
    usersService = TestBed.inject(UsersService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to instructor data and id', () => {
    expect(component.instructor).toEqual({
      id: '1',
      name: 'John Doe',
      socialMedia: {
        web: 'www.johndoe.com',
        youtube: 'www.youtube.com/johndoe',
        twitter: 'www.twitter.com/johndoe',
        linkedin: 'www.linkedin.com/in/johndoe',
      },
      courses: ['Course 1', 'Course 2'],
      imagePath: 'path/to/image',
      rating: [
        { userId: 'user1', rating: 5 },
        { userId: 'user2', rating: 4 },
      ],
    });
    expect(component.instructorId).toEqual('123');
  });

  it('should get user id on init', () => {
    component.ngOnInit();
    expect(component.userId).toEqual('user1');
  });

  it('should update instructor rating', () => {
    const updateInstructorsRatingSpy = spyOn(instructorsService, 'updateInstructorsRating').and.returnValue(Promise.resolve({
      id: '1',
      name: 'John Doe',
      socialMedia: {
        web: 'www.johndoe.com',
        youtube: 'www.youtube.com/johndoe',
        twitter: 'www.twitter.com/johndoe',
        linkedin: 'www.linkedin.com/in/johndoe',
      },
      courses: ['Course 1', 'Course 2'],
      imagePath: 'path/to/image',
      rating: [
        { userId: 'user1', rating: 5 },
        { userId: 'user2', rating: 4 },
      ],
    }));
    component.handleUpdate(5);
    expect(updateInstructorsRatingSpy).toHaveBeenCalledWith('123', { userId: 'user1', rating: 5 });
  });
});
