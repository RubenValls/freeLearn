import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { courseResolver } from './course.resolver';
import { CoursesService } from 'src/app/admins/admins-dashboard/pages/courses/service/courses.service';


describe('courseResolver', () => {
  let coursesService: CoursesService;
  let route: ActivatedRouteSnapshot;

  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => courseResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: CoursesService, useValue: jasmine.createSpyObj('CoursesService', ['getCourseById']) },
      ],
    });
    coursesService = TestBed.inject(CoursesService);
    route = new ActivatedRouteSnapshot();
    route.paramMap.get = jasmine.createSpy('get').and.returnValue('test-id');
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  }); 

  it('should call getCourseById with correct id', () => {
    coursesService.getCourseById = jasmine.createSpy().and.returnValue(Promise.resolve({}));
    executeResolver(route, {} as RouterStateSnapshot);
    expect(coursesService.getCourseById).toHaveBeenCalledWith('test-id');
  });
});