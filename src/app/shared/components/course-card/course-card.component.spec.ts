import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCardComponent } from './course-card.component';
import { SharedModule } from '../../shared.module';

describe('CourseCardComponent', () => {
  let component: CourseCardComponent;
  let fixture: ComponentFixture<CourseCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseCardComponent],
      imports: [
        SharedModule
      ]
    });
    fixture = TestBed.createComponent(CourseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle description correctly', () => {
    const shortDescription = 'short description';
    const longDescription = 'a'.repeat(101);

    expect(component.handleDescription(shortDescription)).toEqual(shortDescription);
    expect(component.handleDescription(longDescription)).toEqual('a'.repeat(100) + '...');
  });
});
