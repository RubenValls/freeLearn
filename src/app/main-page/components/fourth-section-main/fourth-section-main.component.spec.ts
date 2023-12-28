import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourthSectionMainComponent } from './fourth-section-main.component';

describe('FourthSectionMainComponent', () => {
  let component: FourthSectionMainComponent;
  let fixture: ComponentFixture<FourthSectionMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FourthSectionMainComponent]
    });
    fixture = TestBed.createComponent(FourthSectionMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
