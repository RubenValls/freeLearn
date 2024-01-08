import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorsMainPageComponent } from './instructors-main-page.component';

describe('InstructorsMainPageComponent', () => {
  let component: InstructorsMainPageComponent;
  let fixture: ComponentFixture<InstructorsMainPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorsMainPageComponent]
    });
    fixture = TestBed.createComponent(InstructorsMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
