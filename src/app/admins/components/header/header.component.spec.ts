import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

fdescribe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have isSmallScreen defined', () => {
    expect(component.isSmallScreen).toBeDefined();
  });

  it('should set isSmallScreen to true if window width is less than 700', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(600);
    component.onResize();
    expect(component.isSmallScreen).toBeTrue();
  });

  it('should set isSmallScreen to false if window width is greater than or equal to 700', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(700);
    component.onResize();
    expect(component.isSmallScreen).toBeFalse();
  });

  it('should navigate to login on logout', () => {
    const spy = spyOn(router, 'navigate');
    component.handleLogOut();
    expect(spy).toHaveBeenCalledWith(['/login']);
  });

  it('should render logo if not small screen', () => {
    component.isSmallScreen = false;
    fixture.detectChanges();
    const logo = fixture.debugElement.query(By.css('img'));
    expect(logo).toBeTruthy();
  });

  it('should not render logo if small screen', () => {
    component.isSmallScreen = true;
    fixture.detectChanges();
    const logo = fixture.debugElement.query(By.css('img'));
    expect(logo).toBeNull();
  });

  it('should render logout button', () => {
    const logoutButton = fixture.debugElement.query(By.css('#log-out-btn'));
    expect(logoutButton).toBeTruthy();
  });
});
