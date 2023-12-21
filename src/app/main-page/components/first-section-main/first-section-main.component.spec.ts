import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FirstSectionMainComponent } from './first-section-main.component';
import { BtnBlackComponent } from 'src/app/shared/components/btn-black/btn-black.component';

describe('FirstSectionMainComponent', () => {
  let component: FirstSectionMainComponent;
  let fixture: ComponentFixture<FirstSectionMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FirstSectionMainComponent, BtnBlackComponent]
    });

    fixture = TestBed.createComponent(FirstSectionMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
