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
    localStorage.clear()
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have user after OnInit', () => {
    localStorage.setItem('userInfo', JSON.stringify({
      displayName: 'Test User',
      email: 'testuser@example.com',
      phoneNumber: '1234567890',
      photoURL: null,
      providerId: null,
      rememberMe: true,
      uid: '1',
      authUid: '1',
    }))
    component.ngOnInit();
    expect(component.user).toBeTruthy();
  });

  it('should get user from local storage if available', () => {
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

  it('should get user from session storage if not in local storage', () => {
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
});