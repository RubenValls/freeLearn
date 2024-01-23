import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { TechPageComponent } from './tech-page.component';
import { CoursesService } from 'src/app/admins/admins-dashboard/pages/courses/service/courses.service';

describe('TechPageComponent', () => {
  let component: TechPageComponent;
  let fixture: ComponentFixture<TechPageComponent>;
  let mockCourseService: any;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockCourseService = { getTopicCourses: jasmine.createSpy('getTopicCourses').and.returnValue(Promise.resolve([])) };
    mockActivatedRoute = {
      data: of({ data: { courses: ['course1', 'course2'] } }),
      paramMap: of({ get: () => 'techId' })
    };

    await TestBed.configureTestingModule({
      declarations: [ TechPageComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: CoursesService, useValue: mockCourseService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set techCoursesId on ngOnInit', () => {
    component.ngOnInit();
    expect(component.techCoursesId).toEqual(['course1', 'course2']);
  });

  it('should set techId on ngOnInit', () => {
    component.ngOnInit();
    expect(component.techId).toEqual('techId');
  });

  it('should call getTopicCourses on ngOnInit', () => {
    mockCourseService.getTopicCourses.and.returnValue(Promise.resolve([]));
    component.ngOnInit();
    expect(mockCourseService.getTopicCourses).toHaveBeenCalledWith(['course1', 'course2']);
  });

  it('should set tech on ngOnInit', () => {
    const mockTech = {
      id: '1',
      name: 'Angular',
      imagePath: 'path/to/image',
      description: 'A platform for building web applications.',
      courses: ["1", "2"]
    };
    mockActivatedRoute.data = of({ data: mockTech });
    component.ngOnInit();
    expect(component.tech).toEqual(mockTech);
  });
  
  it('should unsubscribe on ngOnDestroy', () => {
    spyOn(component.techSubscription!, 'unsubscribe');
    spyOn(component.techIdSubscription!, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.techSubscription!.unsubscribe).toHaveBeenCalled();
    expect(component.techIdSubscription!.unsubscribe).toHaveBeenCalled();
  });
  
});
