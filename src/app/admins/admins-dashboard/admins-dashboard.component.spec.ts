import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsDashboardComponent } from './admins-dashboard.component';

describe('AdminsDashboardComponent', () => {
  let component: AdminsDashboardComponent;
  let fixture: ComponentFixture<AdminsDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminsDashboardComponent]
    });
    fixture = TestBed.createComponent(AdminsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
