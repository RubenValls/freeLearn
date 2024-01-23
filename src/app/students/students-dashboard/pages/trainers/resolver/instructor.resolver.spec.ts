import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { InstructorsService } from 'src/app/admins/admins-dashboard/pages/instructors/instructors-service/instructors.service';
import { instructorResolver } from './instructor.resolver';

describe('instructorResolver', () => {
  let instructorService: InstructorsService;
  let route: ActivatedRouteSnapshot;

  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => instructorResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: InstructorsService, useValue: jasmine.createSpyObj('InstructorsService', ['getInstructorById']) },
      ],
    });

    instructorService = TestBed.inject(InstructorsService);
    route = new ActivatedRouteSnapshot();
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });

  it('should call getInstructorById with correct id', () => {
    route.paramMap.get = jasmine.createSpy('get').and.returnValue('test-id');
    instructorService.getInstructorById = jasmine.createSpy().and.returnValue(Promise.resolve({}));
    executeResolver(route, {} as RouterStateSnapshot);
    expect(instructorService.getInstructorById).toHaveBeenCalledWith('test-id');
  });

  it('should call getInstructorById with correct id', () => {
    route.paramMap.get = jasmine.createSpy('get').and.returnValue(null);
    instructorService.getInstructorById = jasmine.createSpy().and.returnValue(Promise.resolve({}));
    executeResolver(route, {} as RouterStateSnapshot);
    expect(instructorService.getInstructorById).toHaveBeenCalledWith('');
  });
});
