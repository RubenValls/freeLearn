import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologiesComponent } from './technologies.component';
import { StudentsModule } from 'src/app/students/students.module';

describe('TechnologiesComponent', () => {
  let component: TechnologiesComponent;
  let fixture: ComponentFixture<TechnologiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TechnologiesComponent],
      imports: [StudentsModule],

    });
    fixture = TestBed.createComponent(TechnologiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
