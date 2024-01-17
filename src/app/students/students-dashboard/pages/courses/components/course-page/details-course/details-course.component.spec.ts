import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DetailsCourseComponent } from './details-course.component';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth'
import { environment } from 'src/environments/environment';
import { InstructorsService } from 'src/app/admins/admins-dashboard/pages/instructors/instructors-service/instructors.service';
import { TechService } from 'src/app/admins/admins-dashboard/pages/technologies/service/tech.service';
import { of } from 'rxjs';

describe('DetailsCourseComponent', () => {
  let component: DetailsCourseComponent;
  let fixture: ComponentFixture<DetailsCourseComponent>;
  let mockInstructorsService: any;
  let mockTechsService: any;

  beforeEach(() => {
    mockInstructorsService = jasmine.createSpyObj(['getInstructorByCourseId']);
    mockTechsService = jasmine.createSpyObj(['getTechnologyByCourseId']);

    TestBed.configureTestingModule({
      declarations: [DetailsCourseComponent],
      providers: [
        { provide: InstructorsService, useValue: mockInstructorsService },
        { provide: TechService, useValue: mockTechsService },
      ],
      imports: [
        provideFirestore(() => getFirestore()),
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAuth(() => getAuth()),
        ], 
    });

    fixture = TestBed.createComponent(DetailsCourseComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch instructors and technologies data on initialization', fakeAsync(() => {
    mockInstructorsService.getInstructorByCourseId.and.returnValue(of([{ id: '1', name: 'Instructor 1' }]));
    mockTechsService.getTechnologyByCourseId.and.returnValue(of([{ id: '1', name: 'Tech 1' }]));

    component.courseId = 'course1';
    component.ngOnInit();
    tick();

    expect(component.instructorsData).toEqual([{ id: '1', name: 'Instructor 1' }]);
    expect(component.techsData).toEqual([{ id: '1', name: 'Tech 1' }]);
  }));
});

