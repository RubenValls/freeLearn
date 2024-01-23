import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { HomeTechnologiesComponent } from "./home-technologies.component";
import { StudentsModule } from "src/app/students/students.module";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from 'rxjs';
import { TechnologyType } from 'src/app/admins/admins-dashboard/pages/technologies/types/technologies';
import { Store } from '@ngrx/store';

describe('HomeTechnologiesComponent', () => {
  let component: HomeTechnologiesComponent;
  let fixture: ComponentFixture<HomeTechnologiesComponent>;
  let store: Store;
  let storeMock: any;

  beforeEach(() => {
    const technologyMock: TechnologyType[] = [
      {
        id: '1',
        name: 'Angular',
        description: 'A platform for building web applications.',
        imagePath: '/path/to/angular.png',
        courses: [
          { id: '1', name: 'Introduction to Angular', duration: '3 hours' },
          { id: '2', name: 'Angular Advanced Concepts', duration: '5 hours' },
        ],
      },
      {
        id: '2',
        name: 'React',
        description: 'A JavaScript library for building user interfaces.',
        imagePath: '/path/to/react.png',
        courses: [
          { id: '3', name: 'React Fundamentals', duration: '4 hours' },
          { id: '4', name: 'React Hooks', duration: '2 hours' },
        ],
      },
    ];
  
    storeMock = {
      select: jasmine.createSpy('select').and.returnValue(of(technologyMock)),
    };

    TestBed.configureTestingModule({
      declarations: [HomeTechnologiesComponent],
      imports: [
        StudentsModule,
        RouterTestingModule,
      ],
      providers:[
        { provide: Store, useValue: storeMock },
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(HomeTechnologiesComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should define tech$ on creation', () => {
    expect(component.tech$).toBeDefined();
  });

  it('should define techs and techsSubscription on ngOnInit', () => {
    component.ngOnInit();
    expect(component.techs).toBeDefined();
    expect(component.techsSubscription).toBeDefined();
  });

  it('should call select from store on init', () => {
    expect(storeMock.select).toHaveBeenCalled();
  });

  it('should select technologies from store on init', () => {
    expect(component.techs).toBeTruthy();
  });

  it('should unsubscribe from techsSubscription on destroy', () => {
    component.ngOnDestroy();
    expect(component.techsSubscription?.closed).toBeTrue();
  });
});
