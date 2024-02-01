import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { InstructorsComponent } from './instructors.component';
import { MatIconModule } from '@angular/material/icon';
import { AdminsModule } from 'src/app/admins/admins.module';
import { provideMockStore } from '@ngrx/store/testing';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { InstructorsService } from './instructors-service/instructors.service';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('InstructorsComponent', () => {
  let component: InstructorsComponent;
  let fixture: ComponentFixture<InstructorsComponent>;
  let mockInstructorsService: any;
  let mockAlertMessages: any;

  beforeEach(async () => {
    mockInstructorsService = jasmine.createSpyObj(['updateInstructor', 'getInstructorById', 'deleteInstructor']);
    mockAlertMessages = jasmine.createSpyObj(['successMessage', 'errorMessage']);

    await TestBed.configureTestingModule({
      declarations: [ InstructorsComponent ],
      imports: [
        AdminsModule, 
        MatIconModule,
        BrowserAnimationsModule,
        provideFirestore(() => getFirestore()),
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAuth(() => getAuth()),
      ],
      providers: [
        provideMockStore(),
        { provide: InstructorsService, useValue: mockInstructorsService },
        { provide: AlertsService, useValue: mockAlertMessages }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct initial variable values', () => {
    expect(component.showForm).toBe(false);
    expect(component.modalWith).toBe('1034');
    expect(component.modalHeight).toBe('600px');
    expect(component.modalTitle).toBe('Trainer');
    expect(component.tableColumns).toEqual([
      { prop: 'name', title: 'Name' },
      { prop: 'imagePath', title: 'Image' },
      { prop: 'courses', title: 'NºCourses' },
      { prop: 'rating', title: 'Rating' },
      { prop: 'socialMedia', title: 'SocialMedia' }
    ]);
    expect(component.rows).toEqual([
      { label: 'Id', prop: 'id' },
      { label: 'Name', prop: 'name' },
      { label: 'Image', prop: 'imagePath' },
      { label: 'Courses', prop: 'courses' },
      { label: 'Rating', prop: 'rating' },
      {
        label: 'SocialMedia', prop: 'socialMedia',
        subFields: [
          { label: 'Web', prop: 'web' },
          { label: 'YouTube', prop: 'youtube' },
          { label: 'Twitter', prop: 'twitter' },
          { label: 'LinkedIn', prop: 'linkedin' },
        ],
      },
    ]);
  });

  it('should filter instructors', fakeAsync(() => {
    const instructor = [
      {
        id: '1',
        name: 'John Doe',
        socialMedia: {
            web: 'www.johndoe.com',
            youtube: 'www.youtube.com/johndoe',
            twitter: 'www.twitter.com/johndoe',
            linkedin: 'www.linkedin.com/in/johndoe',
        },
        courses: ['Course 1', 'Course 2'],
        imagePath: '/path/to/image.jpg',
        rating: [
            { userId: 'user1', rating: 5 },
            { userId: 'user2', rating: 4 }
        ]
    },
    {
      id: '1',
      name: 'Jane Doe',
      socialMedia: {
          web: 'www.janedoe.com',
          youtube: 'www.youtube.com/janedoe',
          twitter: 'www.twitter.com/janedoe',
          linkedin: 'www.linkedin.com/in/janedoe',
      },
      courses: ['Course 1', 'Course 2'],
      imagePath: '/path/to/image.jpg',
      rating: [
          { userId: 'user1', rating: 5 },
          { userId: 'user2', rating: 4 }
      ]
  },
    ];
    component.instructors$ = of(instructor);

    component.ngOnInit();

    tick();

    expect(component.totalItems).toBe(2);
    component.searchInstructorControl.setValue('Jane');

    tick();
    expect(component.filteredInstructor).toEqual([{
      id: '1',
      name: 'Jane Doe',
      socialMedia: {
          web: 'www.janedoe.com',
          youtube: 'www.youtube.com/janedoe',
          twitter: 'www.twitter.com/janedoe',
          linkedin: 'www.linkedin.com/in/janedoe',
      },
      courses: ['Course 1', 'Course 2'],
      imagePath: '/path/to/image.jpg',
      rating: [
          { userId: 'user1', rating: 5 },
          { userId: 'user2', rating: 4 }
      ]
    }]);

    component.searchInstructorControl.setValue('');

    tick();

    expect(component.filteredInstructor).toEqual(instructor);
  }));

  it('should toggle showForm on toggleForm', () => {
    component.showForm = false;
    component.toggleForm();
    expect(component.showForm).toBe(true);
    component.toggleForm();
    expect(component.showForm).toBe(false);
  });

  it('should call updateInstructor on onEdit', async () => {
    const instructor = {
      id: '1',
      name: 'John Doe',
      socialMedia: {
          web: 'www.johndoe.com',
          youtube: 'www.youtube.com/johndoe',
          twitter: 'www.twitter.com/johndoe',
          linkedin: 'www.linkedin.com/in/johndoe',
      },
      courses: ['Course 1', 'Course 2'],
      imagePath: '/path/to/image.jpg',
      rating: [
          { userId: 'user1', rating: 5 },
          { userId: 'user2', rating: 4 }
      ]
    };
    mockInstructorsService.updateInstructor.and.returnValue(Promise.resolve());

    try {
    await component.onEdit(instructor);
    } catch (error) {
      console.error(error);
    }

    expect(mockInstructorsService.updateInstructor).toHaveBeenCalledWith(instructor.id, instructor);
    expect(mockAlertMessages.successMessage).toHaveBeenCalledWith('Trainer update successfully');
  });

  it('should call deleteInstructor on onDelete when instructor has no courses', async () => {
    const instructorId = '1';
    mockInstructorsService.getInstructorById.and.returnValue(Promise.resolve({ courses: [] }));
    mockInstructorsService.deleteInstructor.and.returnValue(Promise.resolve());

    await component.onDelete(instructorId);

    expect(mockInstructorsService.getInstructorById).toHaveBeenCalledWith(instructorId);
    expect(mockInstructorsService.deleteInstructor).toHaveBeenCalledWith(instructorId);
    expect(mockAlertMessages.successMessage).toHaveBeenCalledWith('Trainer delete successfully');
  });

  it('should not call deleteInstructor on onDelete when instructor has courses', async () => {
    const instructorId = '1';
    mockInstructorsService.getInstructorById.and.returnValue(Promise.resolve({ courses: ['course1'] }));

    await component.onDelete(instructorId);

    expect(mockInstructorsService.getInstructorById).toHaveBeenCalledWith(instructorId);
    expect(mockInstructorsService.deleteInstructor).not.toHaveBeenCalled();
    expect(mockAlertMessages.errorMessage).toHaveBeenCalledWith("You can't delete it, contains courses");
  });

  it('should reset form on onSubmit success', async () => {
    const instructorId = '1';
    mockInstructorsService.getInstructorById.and.returnValue(Promise.resolve({ courses: [] }));
    mockInstructorsService.deleteInstructor.and.returnValue(Promise.resolve());


    await component.onDelete(instructorId);

    expect(mockInstructorsService.getInstructorById).toHaveBeenCalledWith(instructorId);
    expect(mockInstructorsService.deleteInstructor).toHaveBeenCalledWith(instructorId);
    expect(mockAlertMessages.successMessage).toHaveBeenCalledWith('Trainer delete successfully');
  });

  it('should handle page change', () => {
    const event = { pageIndex: 1, pageSize: 10 };
    spyOn(component, 'getInstructors');

    component.onPageChange(event);

    expect(component.currentPage).toEqual(event.pageIndex);
    expect(component.pageSize).toEqual(event.pageSize);
    expect(component.getInstructors).toHaveBeenCalled();
  });

  it('should filter instructors based on input', () => {
    const instructors = [
      {
        id: '1',
        name: 'John Doe',
        socialMedia: {
            web: 'www.johndoe.com',
            youtube: 'www.youtube.com/johndoe',
            twitter: 'www.twitter.com/johndoe',
            linkedin: 'www.linkedin.com/in/johndoe',
        },
        courses: ['Course 1', 'Course 2'],
        imagePath: '/path/to/image.jpg',
        rating: [
            { userId: 'user1', rating: 5 },
            { userId: 'user2', rating: 4 }
        ]
    },
    {
      id: '1',
      name: 'Jane Doe',
      socialMedia: {
          web: 'www.janedoe.com',
          youtube: 'www.youtube.com/janedoe',
          twitter: 'www.twitter.com/janedoe',
          linkedin: 'www.linkedin.com/in/janedoe',
      },
      courses: ['Course 1', 'Course 2'],
      imagePath: '/path/to/image.jpg',
      rating: [
          { userId: 'user1', rating: 5 },
          { userId: 'user2', rating: 4 }
      ]
  },
    ];
    const input = 'john';

    const filteredInstructors = component.filterInstructor(instructors, input);

    expect(filteredInstructors.length).toBe(1);
    expect(filteredInstructors[0].name).toBe('John Doe');
  });
});
