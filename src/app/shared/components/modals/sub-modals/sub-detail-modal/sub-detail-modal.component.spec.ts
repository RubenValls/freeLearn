import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubDetailModalComponent } from './sub-detail-modal.component';

describe('SubDetailModalComponent', () => {
  let component: SubDetailModalComponent;
  let fixture: ComponentFixture<SubDetailModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubDetailModalComponent]
    });
    fixture = TestBed.createComponent(SubDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
