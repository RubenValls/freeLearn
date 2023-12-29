import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdSectionMainComponent } from './third-section-main.component';

describe('ThirdSectionMainComponent', () => {
  let component: ThirdSectionMainComponent;
  let fixture: ComponentFixture<ThirdSectionMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThirdSectionMainComponent]
    });
    fixture = TestBed.createComponent(ThirdSectionMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
