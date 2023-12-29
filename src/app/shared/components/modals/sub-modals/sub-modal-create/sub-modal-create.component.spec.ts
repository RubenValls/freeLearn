import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubModalCreateComponent } from './sub-modal-create.component';

describe('SubModalCreateComponent', () => {
  let component: SubModalCreateComponent;
  let fixture: ComponentFixture<SubModalCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubModalCreateComponent]
    });
    fixture = TestBed.createComponent(SubModalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
