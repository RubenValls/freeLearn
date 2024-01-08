import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { ResizeService } from 'src/app/shared/services/resize/resize.service';
import { Router } from '@angular/router';
import { Subscription, of } from 'rxjs';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let resizeService: ResizeService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      providers: [
        { provide: ResizeService, useValue: { checkScreenSize: () => {}, isSmallScreen$: of(false) } },
        { provide: Router, useValue: { navigate: () => {} } }
      ]
    });
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    resizeService = TestBed.inject(ResizeService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize isSmallScreen on ngOnInit', () => {
    spyOn(resizeService, 'checkScreenSize');
    component.ngOnInit();
    expect(component.isSmallScreen).toBeFalse();
    expect(resizeService.checkScreenSize).toHaveBeenCalledWith(500);
  });

  it('should unsubscribe from isSmallScreen$ on ngOnDestroy', () => {
    const subscription = component.smallScreenSubscription as Subscription;
    spyOn(subscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(subscription.unsubscribe).toHaveBeenCalled();
  });

  it('should remove userInfo from localStorage and sessionStorage and navigate to /login on handleLogOut', () => {
    spyOn(localStorage, 'removeItem');
    spyOn(sessionStorage, 'removeItem');
    spyOn(router, 'navigate');
    component.handleLogOut();
    expect(localStorage.removeItem).toHaveBeenCalledWith('userInfo');
    expect(sessionStorage.removeItem).toHaveBeenCalledWith('userInfo');
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
