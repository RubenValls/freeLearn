import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTechComponent } from './card-tech.component';
import { StudentsModule } from 'src/app/students/students.module';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { TechnologyType } from 'src/app/admins/admins-dashboard/pages/technologies/types/technologies';

describe('CardTechComponent', () => {
  let component: CardTechComponent;
  let fixture: ComponentFixture<CardTechComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardTechComponent],
      imports: [StudentsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 'test' }),
            data: of({ data: { id: 'test' } })
          }
        }      
      ],
    });
    fixture = TestBed.createComponent(CardTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have tech input', () => {
    component.tech = {
      id: '1',
      name: 'Angular',
      imagePath: 'path/to/image',
      description: 'A platform for building web applications.',
      courses: []
    };
    fixture.detectChanges();
    expect(component.tech).toBeDefined();
    expect(component.tech.id).toEqual('1');
    expect(component.tech.name).toEqual('Angular');
    expect(component.tech.imagePath).toEqual('path/to/image');
    expect(component.tech.description).toEqual('A platform for building web applications.');
  });

  it('should handle undefined tech input', () => {
    component.tech = undefined;
    fixture.detectChanges();
    expect(component.tech).toBeUndefined();
  });

  it('should set tech properties when tech input is provided', () => {
    const mockTech: TechnologyType = {
      id: '1',
      name: 'React',
      imagePath: 'path/to/react/image',
      description: 'A JavaScript library for building user interfaces.',
      courses: []
    };
  
    component.tech = mockTech;
    fixture.detectChanges();
  
    expect(component.tech).toEqual(mockTech);
    expect(component.tech?.id).toEqual('1');
    expect(component.tech?.name).toEqual('React');
    expect(component.tech?.imagePath).toEqual('path/to/react/image');
    expect(component.tech?.description).toEqual('A JavaScript library for building user interfaces.');
  });
  
  it('should handle undefined tech input and set tech to undefined', () => {
    component.tech = undefined;
    fixture.detectChanges();
  
    expect(component.tech).toBeUndefined();
  });
  
});
