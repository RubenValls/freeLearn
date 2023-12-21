import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondSectionMainComponent } from './second-section-main.component';

describe('SecondSectionMainComponent', () => {
  let component: SecondSectionMainComponent;
  let fixture: ComponentFixture<SecondSectionMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecondSectionMainComponent]
    });
    fixture = TestBed.createComponent(SecondSectionMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
