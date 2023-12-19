import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInstructorsFormComponent } from './create-instructors-form.component';

describe('InstructorsFormComponent', () => {
  let component: CreateInstructorsFormComponent;
  let fixture: ComponentFixture<CreateInstructorsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateInstructorsFormComponent]
    });
    fixture = TestBed.createComponent(CreateInstructorsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
