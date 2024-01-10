import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechsMainPageComponent } from './techs-main-page.component';

describe('TechsMainPageComponent', () => {
  let component: TechsMainPageComponent;
  let fixture: ComponentFixture<TechsMainPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TechsMainPageComponent]
    });
    fixture = TestBed.createComponent(TechsMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
