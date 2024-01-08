import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { UsersComponent } from './users.component';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { AdminsModule } from 'src/app/admins/admins.module';
import { User } from 'src/app/login/types/user';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let storeMock: any;
  let alertMessagesMock: any;
  let userServiceMock: any;
  let store: Store;

  beforeEach(async () => {
    const usersMock: User[] = [
      {
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
      },
    ];
  
    storeMock = {
      select: jasmine.createSpy('select').and.returnValue(of(usersMock)),
    };

    alertMessagesMock = {
      successMessage: jasmine.createSpy('successMessage'),
      errorMessage: jasmine.createSpy('errorMessage')
    };

    userServiceMock = {
      updateUser: jasmine.createSpy('updateUser').and.returnValue(Promise.resolve())
    };

    await TestBed.configureTestingModule({
      declarations: [UsersComponent],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: AlertsService, useValue: alertMessagesMock },
        { provide: UsersService, useValue: userServiceMock }
      ],
      imports: [AdminsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select users from store on init', () => {
    expect(storeMock.select).toHaveBeenCalled();
  });

  it('should update user and show success message on edit', async () => {
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
    userServiceMock.updateUser.and.returnValue(Promise.resolve());
    await component.onEdit(user);
    expect(userServiceMock.updateUser).toHaveBeenCalledWith(user.id, user);
    expect(alertMessagesMock.successMessage).toHaveBeenCalledWith('User update successfully');
  });

  it('should show error message if update fails', async () => {
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
    userServiceMock.updateUser.and.returnValue(Promise.reject({ message: 'Error' }));
    await component.onEdit(user);

    fixture.whenStable().then(() => {
      expect(userServiceMock.updateUser).toHaveBeenCalledWith(user.id, user);
      expect(alertMessagesMock.errorMessage).toHaveBeenCalledWith('Error updating user', 'Error');
    });
  });

});
