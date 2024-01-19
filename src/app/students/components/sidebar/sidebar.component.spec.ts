import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { ResizeService } from 'src/app/shared/services/resize/resize.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, of } from 'rxjs';
import { StudentsModule } from '../../students.module';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let resizeService: ResizeService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      imports: [
        MatSnackBarModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { 
          provide: ResizeService, 
          useValue: { 
            checkScreenSize: () => {}, 
            isSmallScreen$: of(false) 
          } 
        },
        { provide: Router, useValue: { navigate: () => {} } },
        { provide: ActivatedRoute, useValue: { root: {} } }
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

  it('should show success message on handleLogOut', () => {
    const userInfo = { email: 'test@example.com' };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(userInfo));
    spyOn(component, 'callAlertMessage');
    component.handleLogOut();
    expect(component.callAlertMessage).toHaveBeenCalledWith('See you soon: ' + userInfo.email);
  });

  it('should subscribe to isSmallScreen$ on ngOnInit', () => {
    const isSmallScreen$ = of(true);
    let result: boolean = false;
    isSmallScreen$.subscribe(value => result = value);
    component.ngOnInit();
    expect(result).toBeTrue();
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
