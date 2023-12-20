import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnGradientComponent } from './btn-gradient.component';

describe('BtnGradientComponent', () => {
  let component: BtnGradientComponent;
  let fixture: ComponentFixture<BtnGradientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BtnGradientComponent]
    });
    fixture = TestBed.createComponent(BtnGradientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
