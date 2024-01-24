import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TechnologiesComponent } from './technologies.component';
import { Store, StoreModule } from '@ngrx/store';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';
import { TechService } from './service/tech.service';
import { of } from 'rxjs';
import { AdminsModule } from 'src/app/admins/admins.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TechnologiesComponent', () => {
  let component: TechnologiesComponent;
  let fixture: ComponentFixture<TechnologiesComponent>;
  let techsService: jasmine.SpyObj<TechService>;
  let alertsService: jasmine.SpyObj<AlertsService>;
  let store: Store;

  beforeEach(() => {
    techsService = jasmine.createSpyObj('TechService', [
      'updateTechnology',
      'getTechnologyById',
      'deleteTechDoc'
    ]);
    alertsService = jasmine.createSpyObj('AlertsService', [
      'successMessage',
      'errorMessage'
    ]);

    TestBed.configureTestingModule({
      declarations: [TechnologiesComponent],
      imports: [
        AdminsModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({}),
      ],
      providers: [
        { provide: TechService, useValue: techsService },
        { provide: AlertsService, useValue: alertsService },
        { provide: Store, useValue: { select: () => of([]) } }
      ]
    });
    fixture = TestBed.createComponent(TechnologiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onEdit and display success message', async () => {
    const technology = { id: '1', name: 'Angular', imagePath: '', description: '', courses: [] };
    techsService.updateTechnology.and.returnValue(Promise.resolve());
    await component.onEdit(technology);
    expect(techsService.updateTechnology).toHaveBeenCalledWith(technology.id, technology);
    expect(alertsService.successMessage).toHaveBeenCalledWith('Technology update successfully');
  });

  it('should call onDelete and display success message', fakeAsync(() => {
    const technologyId = '1';
    techsService.getTechnologyById.and.returnValue(Promise.resolve({ id: '1', name: 'Angular', imagePath: '', description: '', courses: [] }));
    techsService.deleteTechDoc.and.returnValue(Promise.resolve());
    component.onDelete(technologyId);
    tick();
    expect(techsService.deleteTechDoc).toHaveBeenCalledWith(technologyId);
    expect(alertsService.successMessage).toHaveBeenCalledWith('Technology delete successfully');
  }));

  it('should call onPageChange and update pagination properties', () => {
    const event = { pageIndex: 2, pageSize: 20 };
    component.onPageChange(event);
    expect(component.currentPage).toBe(2);
    expect(component.pageSize).toBe(20);
  });

  it('should call onToggleForm and toggle form visibility', () => {
    component.isFormVisible = false;
    component.onToggleForm();
    expect(component.isFormVisible).toBe(true);
  });
  
  it('should call getTechs and return sliced array when filteredTechs is not empty', () => {
    const mockFilteredTechs = [{ id: '1', name: 'Angular', imagePath: '', description: '', courses: [] }];
    component.filteredTechs = mockFilteredTechs;
    const result = component.getTechs();
    expect(result).toEqual(mockFilteredTechs);
  });
  
  it('should call getTechs and return sliced array from technologies$ when filteredTechs is empty', (done) => {
    const mockTechnologies = [
      { id: '1', name: 'Angular', imagePath: '', description: '', courses: [] },
      { id: '2', name: 'React', imagePath: '', description: '', courses: [] },
    ];
    component.technologies$ = of(mockTechnologies);
  
    component.getTechs().subscribe((result: any) => {
      expect(result).toEqual(mockTechnologies.slice(0, component.pageSize));
      done();
    });
  });
  
});
