import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { StudentsModule } from 'src/app/students/students.module';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        StudentsModule
      ]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit update event when rating changes', () => {
    spyOn(component.handleUpdate, 'emit');
    const newRating = 5;
    component.onRatingChanged(newRating);
    expect(component.handleUpdate.emit).toHaveBeenCalledWith(newRating);
  });
});
