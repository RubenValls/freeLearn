import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import firebase from 'firebase/compat/app';
import { environment } from 'src/environments/environment';
import { RouterModule, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppRoutingModule } from './app-routing.module';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { AdminsDashboardComponent } from './admins/admins-dashboard/admins-dashboard.component';
import { ErrorPageComponent } from './shared/components/default-pages/error-page/error-page.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, LoginPageComponent, AdminsDashboardComponent],
      imports: [
        RouterModule, 
        RouterTestingModule.withRoutes([]), 
        AppRoutingModule],
    }).compileComponents();

    router = TestBed.inject(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize firebase on init', () => {
    spyOn(firebase, 'initializeApp');
    component.ngOnInit();
    expect(firebase.initializeApp).toHaveBeenCalledWith(environment.firebaseConfig);
  });

  it('should have title set to freeLearn', () => {
    expect(component.title).toEqual('freeLearn');
  });

  it('should render the router outlet', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

  it('should handle ngOnInit error when initializing Firebase', () => {
    spyOn(firebase, 'initializeApp').and.throwError('Firebase initialization error');
    expect(() => component.ngOnInit()).toThrowError('Firebase initialization error');
  });
});
