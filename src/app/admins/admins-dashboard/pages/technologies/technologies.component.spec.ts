import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologiesComponent } from './technologies.component';
import { AdminsModule } from 'src/app/admins/admins.module';
import { Store, StoreModule } from '@ngrx/store';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { TechService } from './service/tech.service';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';


describe('TechnologiesComponent', () => {
  let component: TechnologiesComponent;
  let fixture: ComponentFixture<TechnologiesComponent>;
  let techsService: jasmine.SpyObj<TechService>;
  let alertsService: jasmine.SpyObj<AlertsService>;
  let store: jasmine.SpyObj<Store>;

  beforeEach(() => {

    techsService = jasmine.createSpyObj('TechService', ['updateTechnology', 'getTechnologyById', 'deleteTechDoc']);
    alertsService = jasmine.createSpyObj('AlertsService', ['successMessage', 'errorMessage']);
    store = jasmine.createSpyObj('Store', ['select']);

    TestBed.configureTestingModule({
      declarations: [TechnologiesComponent],
      imports: [
        AdminsModule,
        StoreModule.forRoot({}),
        provideFirestore(() => getFirestore()),
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAuth(() => getAuth()),
      ],
      providers: [
        { provide: TechService, useValue: techsService },
        { provide: AlertsService, useValue: alertsService },
        { provide: Store, useValue: store },
      ]
    });
    fixture = TestBed.createComponent(TechnologiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle form visibility', () => {
    component.isFormVisible = false;
    component.onToggleForm();
    expect(component.isFormVisible).toBe(true);
  });

  it('should edit a technology', async () => {
    const technology = {
      id: '1',
      name: 'Angular',
      imagePath: 'path/to/image',
      description: 'A platform for building web applications.',
      courses: []
    };
    techsService.updateTechnology.and.returnValue(Promise.resolve());
    await component.onEdit(technology);
    expect(techsService.updateTechnology).toHaveBeenCalledWith(technology.id, technology);
    expect(alertsService.successMessage).toHaveBeenCalledWith('Technology update successfully');
  });

  it('should delete a technology', async () => {
    const technologyId = '1';
    techsService.getTechnologyById.and.returnValue(Promise.resolve({
      id: '1',
      name: 'Angular',
      imagePath: 'path/to/image',
      description: 'A platform for building web applications.',
      courses: []
    }));
    techsService.deleteTechDoc.and.returnValue(Promise.resolve());
    await component.onDelete(technologyId);
    expect(techsService.deleteTechDoc).toHaveBeenCalledWith(technologyId);
    expect(alertsService.successMessage).toHaveBeenCalledWith('Technology delete successfully');
  });

  it('should open a modal for a technology', () => {
    const technology = {
      id: '1',
      name: 'Angular',
      imagePath: 'path/to/image',
      description: 'A platform for building web applications.',
      courses: []
    };
    component.onModals(technology);
    expect(techsService.getTechnologyById).toHaveBeenCalledWith(technology.id);
  });

});
