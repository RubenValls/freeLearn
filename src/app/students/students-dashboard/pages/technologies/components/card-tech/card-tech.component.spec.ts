import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTechComponent } from './card-tech.component';
import { StudentsModule } from 'src/app/students/students.module';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

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
});
