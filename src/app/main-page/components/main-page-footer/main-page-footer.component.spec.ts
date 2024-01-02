import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageFooterComponent } from './main-page-footer.component';

describe('MainPageFooterComponent', () => {
  let component: MainPageFooterComponent;
  let fixture: ComponentFixture<MainPageFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainPageFooterComponent]
    });
    fixture = TestBed.createComponent(MainPageFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
