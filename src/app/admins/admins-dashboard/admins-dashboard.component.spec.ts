import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsDashboardComponent } from './admins-dashboard.component';
import { AdminsModule } from '../admins.module';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

fdescribe('AdminsDashboardComponent', () => {
  let component: AdminsDashboardComponent;
  let fixture: ComponentFixture<AdminsDashboardComponent>;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminsDashboardComponent],
      imports: [
        AdminsModule,
        RouterTestingModule
      ],
      providers: [
        provideMockStore({ }),
      ]
    });
    fixture = TestBed.createComponent(AdminsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
