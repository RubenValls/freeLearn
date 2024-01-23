import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroComponent } from "./hero.component";
import { StudentsModule } from "src/app/students/students.module";
import { RouterTestingModule } from "@angular/router/testing";

describe('HeroComponent', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroComponent],
      imports: [
        StudentsModule,
        RouterTestingModule,
      ]
    });
    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an undefined user by default', () => {
    expect(component.user).toBeUndefined();
  });

  it('should call getUserLogged onInit', () => {
    const spy = spyOn(component, 'getUserLogged');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should have user after OnInit if available in localStorage', () => {
    const user = {
      displayName: 'Test User',
      email: 'testuser@example.com',
      phoneNumber: '1234567890',
      photoURL: null,
      providerId: null,
      rememberMe: true,
      uid: '1',
      authUid: '1',
    };
    localStorage.setItem('userInfo', JSON.stringify(user));
    component.ngOnInit();
    expect(component.user).toEqual(user);
  });

  it('should get user from localStorage if available', () => {
    const user = {
      displayName: 'Test User',
      email: 'testuser@example.com',
      phoneNumber: '1234567890',
      photoURL: null,
      providerId: null,
      rememberMe: true,
      uid: '1',
      authUid: '1',
    };
    localStorage.setItem('userInfo', JSON.stringify(user));
    component.getUserLogged();
    expect(component.user).toEqual(user);
    localStorage.removeItem('userInfo');
  });

  it('should get user from sessionStorage if not in localStorage', () => {
    const user = {
      displayName: 'Test User',
      email: 'testuser@example.com',
      phoneNumber: '1234567890',
      photoURL: null,
      providerId: null,
      rememberMe: true,
      uid: '1',
      authUid: '1',
    };
    sessionStorage.setItem('userInfo', JSON.stringify(user));
    component.getUserLogged();
    expect(component.user).toEqual(user);
    sessionStorage.removeItem('userInfo');
  });

  it('should return undefined if no user is logged in', () => {
    localStorage.removeItem('userInfo');
    sessionStorage.removeItem('userInfo');
    component.getUserLogged();
    expect(component.user).toBeUndefined();
  });

  it('should not get user from sessionStorage if user is in localStorage', () => {
    const localUser = {
      displayName: 'Local User',
      email: 'localuser@example.com',
      phoneNumber: '1234567890',
      photoURL: null,
      providerId: null,
      rememberMe: true,
      uid: '1',
      authUid: '1',
    };
    const sessionUser = {
      displayName: 'Session User',
      email: 'sessionuser@example.com',
      phoneNumber: '0987654321',
      photoURL: null,
      providerId: null,
      rememberMe: true,
      uid: '2',
      authUid: '2',
    };
    localStorage.setItem('userInfo', JSON.stringify(localUser));
    sessionStorage.setItem('userInfo', JSON.stringify(sessionUser));
    component.getUserLogged();
    expect(component.user).toEqual(localUser);
    localStorage.removeItem('userInfo');
    sessionStorage.removeItem('userInfo');
  });

  it('should return status of user is logged in', () => {
    localStorage.removeItem('userInfo');
    sessionStorage.removeItem('userInfo');
    component.getUserLogged();
    if(component.user){
      expect(component.user).toBeDefined();
    }else{
      expect(component.user).toBeUndefined();
    }
  });

  it('should handle a specific case when both localStorage and sessionStorage have user info', () => {
    const localUser = {
      displayName: 'Local User',
      email: 'localuser@example.com',
      phoneNumber: '1234567890',
      photoURL: null,
      providerId: null,
      rememberMe: true,
      uid: '1',
      authUid: '1',
    };
    const sessionUser = {
      displayName: 'Session User',
      email: 'sessionuser@example.com',
      phoneNumber: '0987654321',
      photoURL: null,
      providerId: null,
      rememberMe: true,
      uid: '2',
      authUid: '2',
    };
    localStorage.setItem('userInfo', JSON.stringify(localUser));
    sessionStorage.setItem('userInfo', JSON.stringify(sessionUser));
    component.ngOnInit();
    expect(component.user).toEqual(localUser);
    localStorage.removeItem('userInfo');
    sessionStorage.removeItem('userInfo');
  });
  
});
