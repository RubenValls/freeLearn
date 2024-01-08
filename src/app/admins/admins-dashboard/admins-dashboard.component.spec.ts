import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsDashboardComponent } from './admins-dashboard.component';
import { AdminsModule } from '../admins.module';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { By } from '@angular/platform-browser';

describe('AdminsDashboardComponent', () => {
  let component: AdminsDashboardComponent;
  let fixture: ComponentFixture<AdminsDashboardComponent>;
  let store: Store;

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
    store = TestBed.inject(Store)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch Fetch Technologies action on init', () => {
    const spy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith({ type: 'Fetch Technologies' });
  });

  it('should dispatch Fetch Instructors action on init', () => {
    const spy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith({ type: 'Fetch Instructors' });
  });

  it('should dispatch Fetch Courses action on init', () => {
    const spy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith({ type: 'Fetch Courses' });
  });

  it('should dispatch Fetch Users action on init', () => {
    const spy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith({ type: 'Fetch Users' });
  });

  it('should render app-header', () => {
    const appHeader = fixture.debugElement.query(By.css('app-header'));
    expect(appHeader).toBeTruthy();
  });

  it('should render router-outlet', () => {
    const routerOutlet = fixture.debugElement.query(By.css('router-outlet'));
    expect(routerOutlet).toBeTruthy();
  });
});
