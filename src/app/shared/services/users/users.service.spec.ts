import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { UsersService } from './users.service';
import { SharedModule } from '../../shared.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        provideFirestore(() => getFirestore()),
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAuth(() => getAuth()),
      ]
    });
    service = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a user', () => {
    const user = { 
      id: '1',
      authUid: 'test',
      displayName: 'test',
      email: 'test@test.com',
      phoneNumber: '878347374',
      photoURL: 'jdahfkhfjadhf',
      providerId: 'kasdjfkj',
      rememberMe: false,
      role: 'student',
      uid: 'ruben@test.com',
      userUid: '9hiG0Tlp63YWKsSChaP049e3mwh2',
      favorites: [],
    };
    spyOn(service, 'addUser').and.callFake(() => {});
    service.addUser(user);
    expect(service.addUser).toHaveBeenCalledWith(user);
  });

  it('should get users', () => {
    spyOn(service, 'getUsers').and.returnValue(of([]));
    service.getUsers().subscribe(users => {
      expect(users).toEqual([]);
    });
  });

  it('should save user in storage', () => {
    const user = { 
      id: '1',
      authUid: 'test',
      displayName: 'test',
      email: 'test@test.com',
      phoneNumber: '878347374',
      photoURL: 'jdahfkhfjadhf',
      providerId: 'kasdjfkj',
      rememberMe: false,
      role: 'student',
      uid: 'ruben@test.com',
      userUid: '9hiG0Tlp63YWKsSChaP049e3mwh2',
      favorites: [],
    };
    spyOn(localStorage, 'setItem');
    spyOn(sessionStorage, 'setItem');
    service.saveUserInStorage(true, user);
    expect(localStorage.setItem).toHaveBeenCalledWith('userInfo', JSON.stringify(user));
    service.saveUserInStorage(false, user);
    expect(sessionStorage.setItem).toHaveBeenCalledWith('userInfo', JSON.stringify(user));
  });

  it('should get user from storage', () => {
    const user = { 
      id: '1',
      authUid: 'test',
      displayName: 'test',
      email: 'test@test.com',
      phoneNumber: '878347374',
      photoURL: 'jdahfkhfjadhf',
      providerId: 'kasdjfkj',
      rememberMe: false,
      role: 'student',
      uid: 'ruben@test.com',
      userUid: '9hiG0Tlp63YWKsSChaP049e3mwh2',
      favorites: [],
    };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(user));
    spyOn(sessionStorage, 'getItem').and.returnValue(null);
    const result = service.getUserFromStorage();
    expect(result).toEqual(user);
  });

  it('should update a user', async () => {
    const user = { 
      id: '1',
      authUid: 'test',
      displayName: 'test',
      email: 'test@test.com',
      phoneNumber: '878347374',
      photoURL: 'jdahfkhfjadhf',
      providerId: 'kasdjfkj',
      rememberMe: false,
      role: 'student',
      uid: 'ruben@test.com',
      userUid: '9hiG0Tlp63YWKsSChaP049e3mwh2',
      favorites: [],
    };
    spyOn(service, 'updateUser').and.returnValue(Promise.resolve());
    await service.updateUser(user.id, user);
    expect(service.updateUser).toHaveBeenCalledWith(user.id, user);
  });
});
