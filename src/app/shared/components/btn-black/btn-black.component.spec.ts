import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnBlackComponent } from './btn-black.component';

describe('BtnBlackComponent', () => {
  let component: BtnBlackComponent;
  let fixture: ComponentFixture<BtnBlackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BtnBlackComponent]
    });
    fixture = TestBed.createComponent(BtnBlackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
