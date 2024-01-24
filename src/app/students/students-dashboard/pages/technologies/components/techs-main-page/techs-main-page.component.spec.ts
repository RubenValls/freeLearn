import { TestBed } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { TechsMainPageComponent } from './techs-main-page.component';
import { TechnologyType } from 'src/app/admins/admins-dashboard/pages/technologies/types/technologies';
import { Subject, of } from 'rxjs';
import { FormControl } from '@angular/forms';

describe('TechsMainPageComponent', () => {
  let component: TechsMainPageComponent;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      declarations: [TechsMainPageComponent]
    });

    store = TestBed.inject(Store);
    component = new TechsMainPageComponent(store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to tech$ and update techs', () => {
    const mockTechs: TechnologyType[] = [
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
    component.tech$ = of(mockTechs);
    component.ngOnInit();
    expect(component.techs).toEqual(mockTechs);
  });

  it('should filter technologies by name', () => {
    const mockTechs: TechnologyType[] = [
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
    component.techs = mockTechs;
    const filteredTechs = component.filterByName(mockTechs, 'Angular');
    expect(filteredTechs.length).toBe(1);
    expect(filteredTechs[0].name).toBe('Angular');
  });

  it('should return filtered technologies if any', () => {
    const mockTechs: TechnologyType[] = [
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
    component.techs = mockTechs;
    component.filteredTechs = component.filterByName(mockTechs, 'Angular');
    const techs = component.getTech();
    expect(techs.length).toBe(1);
    expect(techs[0].name).toBe('Angular');
  });

  it('should return all technologies if no filter applied', () => {
    const mockTechs: TechnologyType[] = [
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
    component.techs = mockTechs;
    component.filteredTechs = [];
    const techs = component.getTech();
    expect(techs.length).toBe(2);
  });

  it('should update filteredTechs when name FormControl value changes', () => {
    const mockTechs: TechnologyType[] = [
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
    component.techs = mockTechs;
    component.name.setValue('React');
    component.filteredTechs = component.filterByName(component.techs, component.name.value ? component.name.value : '')
    expect(component.filteredTechs.length).toBe(1);
    expect(component.filteredTechs[0].name).toBe('React');
  });
  
  it('should return all technologies when no filter is applied', () => {
    const mockTechs: TechnologyType[] = [
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
    component.techs = mockTechs;
    component.filteredTechs = [];
  
    const techs = component.getTech();
  
    expect(techs.length).toBe(mockTechs.length);
    expect(techs).toEqual(mockTechs);
  });
});
