import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTechFormComponent } from './new-tech-form.component';

describe('NewTechFormComponent', () => {
  let component: NewTechFormComponent;
  let fixture: ComponentFixture<NewTechFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewTechFormComponent]
    });
    fixture = TestBed.createComponent(NewTechFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
