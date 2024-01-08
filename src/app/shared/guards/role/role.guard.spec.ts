import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { UsersService } from '../../services/users/users.service';
import { SharedModule } from '../../shared.module';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { RoleGuard } from './role.guard';
import { UserActions } from 'src/app/login/store/user.actions';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';


describe('RoleGuard', () => {
  let store: MockStore;
  let usersService: UsersService;
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => RoleGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        provideFirestore(() => getFirestore()),
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAuth(() => getAuth()),
        RouterTestingModule.withRoutes([
          { path: 'students', component: DummyComponent },
          { path: 'admin', component: DummyComponent },
          { path: 'login', component: DummyComponent }
        ])
      ],
      providers: [
        provideMockStore(),
        UsersService,
      ],
    });
    store = TestBed.inject(MockStore);
    usersService = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should allow access if role matches expected role', () => {
    const usersService = TestBed.inject(UsersService);
    usersService.getUserFromStorage = () => ({ role: 'admin' });

    const route = { data: { expectedRole: 'admin' } } as unknown as ActivatedRouteSnapshot;
    const state = {} as unknown as RouterStateSnapshot;

    expect(executeGuard(route, state)).toBeTrue();
  });

  it('should redirect to /students if role is student and does not match expected role', () => {
    const usersService = TestBed.inject(UsersService);
    usersService.getUserFromStorage = () => ({ role: 'student' });

    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    const route = { data: { expectedRole: 'admin' } } as unknown as ActivatedRouteSnapshot;
    const state = {} as unknown as RouterStateSnapshot;

    expect(executeGuard(route, state)).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/students']);
  });

  it('should redirect to /admin if role is admin and does not match expected role', () => {
    const usersService = TestBed.inject(UsersService);
    usersService.getUserFromStorage = () => ({ role: 'admin' });

    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    const route = { data: { expectedRole: 'student' } } as unknown as ActivatedRouteSnapshot;
    const state = {} as unknown as RouterStateSnapshot;

    expect(executeGuard(route, state)).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/admin']);
  });

  it('should redirect to /login if role does not match any expected role', () => {
    const usersService = TestBed.inject(UsersService);
    usersService.getUserFromStorage = () => ({ role: 'other' });

    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    const route = { data: { expectedRole: 'admin' } } as unknown as ActivatedRouteSnapshot;
    const state = {} as unknown as RouterStateSnapshot;

    expect(executeGuard(route, state)).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should dispatch an action if a user is found', () => {
    const mockUser = { 
      authUid: 'test',
      displayName: 'test',
      email: 'test@test.com',
      phoneNumber: '878347374',
      photoURL: 'jdahfkhfjadhf',
      providerId: 'kasdjfkj',
      rememberMe: true,
      role: 'admin',
      uid: 'ruben@test.com',
      userUid: '9hiG0Tlp63YWKsSChaP049e3mwh2',
      favorites: [],
    }

    spyOn(usersService, 'getUserFromStorage').and.returnValue(mockUser);
    const dispatchSpy = spyOn(store, 'dispatch');

    const mockRoute = { data: { expectedRole: 'admin' } } as unknown as ActivatedRouteSnapshot;
    const mockState = {} as unknown as RouterStateSnapshot;

    executeGuard(mockRoute, mockState);

    expect(dispatchSpy).toHaveBeenCalledWith(UserActions.addUser({ user: mockUser }));
  });

  it('should not dispatch an action if a user is not found', () => {
    const mockUser = undefined

    spyOn(usersService, 'getUserFromStorage').and.returnValue(mockUser);
    const dispatchSpy = spyOn(store, 'dispatch');

    const mockRoute = { data: { expectedRole: 'admin' } } as unknown as ActivatedRouteSnapshot;
    const mockState = {} as unknown as RouterStateSnapshot;

    executeGuard(mockRoute, mockState);

    expect(dispatchSpy).not.toHaveBeenCalled();
  });
});

@Component({template: ''})
class DummyComponent {}