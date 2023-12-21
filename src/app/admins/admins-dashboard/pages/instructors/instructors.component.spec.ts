// Import the modules and components needed
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InstructorsComponent } from './instructors.component';
import { MatIconModule } from '@angular/material/icon';

describe('InstructorsComponent', () => {
  let component: InstructorsComponent;
  let fixture: ComponentFixture<InstructorsComponent>;

  beforeEach(async () => {
    // Create a testing module for the component
    await TestBed.configureTestingModule({
      declarations: [ InstructorsComponent ],
      imports: [ MatIconModule  ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    // Create an instance of the component
    fixture = TestBed.createComponent(InstructorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should toggle showForm on toggleForm', () => {
    // Check that the toggleForm method changes the showForm property
    component.showForm = false;
    component.toggleForm();
    expect(component.showForm).toBe(true);
    component.toggleForm();
    expect(component.showForm).toBe(false);
  });
});
