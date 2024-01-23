import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { TechService } from 'src/app/admins/admins-dashboard/pages/technologies/service/tech.service';
import { technologiesResolver } from './technologies.resolver';



describe('technologiesResolver', () => {
  let technologiesService: TechService;
  let route: ActivatedRouteSnapshot;

  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => technologiesResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: TechService, useValue: jasmine.createSpyObj('TechService', ['getTechnologyById']) },
      ],
    });
    technologiesService = TestBed.inject(TechService);
    route = new ActivatedRouteSnapshot();
    route.paramMap.get = jasmine.createSpy('get').and.returnValue('test-id');
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  }); 

  it('should call getCourseById with correct id', () => {
    technologiesService.getTechnologyById = jasmine.createSpy().and.returnValue(Promise.resolve({}));
    executeResolver(route, {} as RouterStateSnapshot);
    expect(technologiesService.getTechnologyById).toHaveBeenCalledWith('test-id');
  });
});
