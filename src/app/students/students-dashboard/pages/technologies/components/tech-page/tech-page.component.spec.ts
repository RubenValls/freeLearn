import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechPageComponent } from './tech-page.component';

describe('TechPageComponent', () => {
  let component: TechPageComponent;
  let fixture: ComponentFixture<TechPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TechPageComponent]
    });
    fixture = TestBed.createComponent(TechPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
