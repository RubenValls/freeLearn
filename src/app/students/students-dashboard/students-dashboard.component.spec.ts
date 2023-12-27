import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsDashboardComponent } from './students-dashboard.component';
import { StudentsModule } from '../students.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('StudentsDashboardComponent', () => {
  let component: StudentsDashboardComponent;
  let fixture: ComponentFixture<StudentsDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentsDashboardComponent],
      imports: [
        StudentsModule,
        RouterTestingModule,
      ]
    });
    fixture = TestBed.createComponent(StudentsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });
});
