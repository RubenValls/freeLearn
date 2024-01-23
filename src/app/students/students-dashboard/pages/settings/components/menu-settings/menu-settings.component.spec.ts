import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';
import { MenuSettingsComponent } from './menu-settings.component';
import { StudentsModule } from 'src/app/students/students.module';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginPageComponent } from 'src/app/login/login-page/login-page.component';

describe('MenuSettingsComponent', () => {
  let component: MenuSettingsComponent;
  let fixture: ComponentFixture<MenuSettingsComponent>;
  let alertService: AlertsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuSettingsComponent, LoginPageComponent],
      imports: [
        StudentsModule,
        RouterTestingModule.withRoutes([
        { path: 'login', component: LoginPageComponent }
      ]),
      ],
      providers: [
        { provide: AlertsService, useValue: { successMessage: () => {} } }
      ]
    });
    fixture = TestBed.createComponent(MenuSettingsComponent);
    component = fixture.componentInstance;
    alertService = TestBed.inject(AlertsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize user on ngOnInit', () => {
    const user = {
      id: '1',
      displayName: 'John Doe',
      email: 'john.doe@example.com',
      phoneNumber: '+1234567890',
      photoURL: 'http://example.com/john_doe.jpg',
      providerId: 'provider123',
      rememberMe: true,
      role: 'admin',
      favorites: ['item1', 'item2'],
      uid: 'user123',
      authUid: 'auth123'
    };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(user));
    component.ngOnInit();
    expect(component.user).toEqual(user);
  });

  it('should handle logout', () => {
    const spyAlert = spyOn(alertService, 'successMessage');
    const user = {
      id: '1',
      displayName: 'John Doe',
      email: 'john.doe@example.com',
      phoneNumber: '+1234567890',
      photoURL: 'http://example.com/john_doe.jpg',
      providerId: 'provider123',
      rememberMe: true,
      role: 'admin',
      favorites: ['item1', 'item2'],
      uid: 'user123',
      authUid: 'auth123'
    };
    component.user = user;
    spyOn(localStorage, 'removeItem');
    spyOn(sessionStorage, 'removeItem');
    component.handleLogOut();
    expect(spyAlert).toHaveBeenCalledWith('See you soon: ' + user.email);
    expect(localStorage.removeItem).toHaveBeenCalledWith('userInfo');
    expect(sessionStorage.removeItem).toHaveBeenCalledWith('userInfo');
  });

  it('should not initialize user if no user in local storage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    component.ngOnInit();
    expect(component.user).toBeUndefined();
  });
});
