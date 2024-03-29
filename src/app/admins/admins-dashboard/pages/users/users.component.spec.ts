import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { UsersComponent } from './users.component';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { AdminsModule } from 'src/app/admins/admins.module';
import { User } from 'src/app/login/types/user';
import { selectUsers } from 'src/app/store/users/users.selectors';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
      imports: [
        AdminsModule,
        BrowserAnimationsModule,
      ]
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

  it('should have defined variables', () => {
    expect(component.users$).toBeDefined();
    expect(component.modalWith).toBeDefined();
    expect(component.modalHeight).toBeDefined();
    expect(component.modalTitle).toBeDefined();
    expect(component.tableColumns).toBeDefined();
    expect(component.rows).toBeDefined();
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

  it('should have users$', () => {
    expect(component.users$).toBeDefined();
  });

  it('should have modalWith, modalHeight, modalTitle defined', () => {
    expect(component.modalWith).toBeDefined();
    expect(component.modalHeight).toBeDefined();
    expect(component.modalTitle).toBeDefined();
  });

  it('should have tableColumns and rows defined', () => {
    expect(component.tableColumns).toBeDefined();
    expect(component.rows).toBeDefined();
  });

  it('should select users from store on init', () => {
    expect(storeMock.select).toHaveBeenCalledWith(selectUsers);
  });

  it('should call onEdit method onEdit event', () => {
    const user: User = {
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

    spyOn(component, 'onEdit');
    component.onEdit(user);
    expect(component.onEdit).toHaveBeenCalledWith(user);
  });

  it('should call updateUser method of userService on onEdit', async () => {
    const user: User = {
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

    await component.onEdit(user);
    expect(userServiceMock.updateUser).toHaveBeenCalledWith(user.id!, user);
  });

  it('should show success message on successful update', async () => {
    const user: User = {
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

    await component.onEdit(user);
    expect(alertMessagesMock.successMessage).toHaveBeenCalledWith('User update successfully');
  });

  it('should show error message on failed update', async () => {
    const user: User = {
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
      expect(alertMessagesMock.errorMessage).toHaveBeenCalledWith('Error updating user', 'Error');
    });
  });

  it('should handle page change', () => {
    const event = { pageIndex: 1, pageSize: 10 };
    spyOn(component, 'getUsers');

    component.onPageChange(event);

    expect(component.currentPage).toEqual(event.pageIndex);
    expect(component.pageSize).toEqual(event.pageSize);
    expect(component.getUsers).toHaveBeenCalled();
  });

  describe('filterUser', () => {
    it('should filter users based on displayName', () => {
      const users: User[] = [
        { id: '1', displayName: 'John Doe', email: 'john.doe@example.com', phoneNumber: '+1234567890', photoURL: '', providerId: '', rememberMe: true, role: 'admin', uid: 'user1', authUid: 'auth123' },
        { id: '2', displayName: 'Jane Smith', email: 'jane.smith@example.com', phoneNumber: '+9876543210', photoURL: '', providerId: '', rememberMe: true, role: 'user', uid: 'user2', authUid: 'auth456' },
      ];

      const result = component.filterUser(users, 'John');

      expect(result).toEqual([users[0]]);
    });

    it('should filter users based on email', () => {
      const users: User[] = [
        { id: '1', displayName: 'John Doe', email: 'john.doe@example.com', phoneNumber: '+1234567890', photoURL: '', providerId: '', rememberMe: true, role: 'admin', uid: 'user1', authUid: 'auth123' },
        { id: '2', displayName: 'Jane Smith', email: 'jane.smith@example.com', phoneNumber: '+9876543210', photoURL: '', providerId: '', rememberMe: true, role: 'user', uid: 'user2', authUid: 'auth456' },
      ];

      const result = component.filterUser(users, 'jane.smith');

      expect(result).toEqual([users[1]]);
    });

    it('should filter users based on phoneNumber', () => {
      const users: User[] = [
        { id: '1', displayName: 'John Doe', email: 'john.doe@example.com', phoneNumber: '+1234567890', photoURL: '', providerId: '', rememberMe: true, role: 'admin', uid: 'user1', authUid: 'auth123' },
        { id: '2', displayName: 'Jane Smith', email: 'jane.smith@example.com', phoneNumber: '+9876543210', photoURL: '', providerId: '', rememberMe: true, role: 'user', uid: 'user2', authUid: 'auth456' },
      ];

      const result = component.filterUser(users, '9876543210');

      expect(result).toEqual([users[1]]);
    });

    it('should filter users based on role', () => {
      const users: User[] = [
        { id: '1', displayName: 'John Doe', email: 'john.doe@example.com', phoneNumber: '+1234567890', photoURL: '', providerId: '', rememberMe: true, role: 'admin', uid: 'user1', authUid: 'auth123' },
        { id: '2', displayName: 'Jane Smith', email: 'jane.smith@example.com', phoneNumber: '+9876543210', photoURL: '', providerId: '', rememberMe: true, role: 'user', uid: 'user2', authUid: 'auth456' },
      ];

      const result = component.filterUser(users, 'admin');

      expect(result).toEqual([users[0]]);
    });

    it('should filter users', fakeAsync(() => {
      const users = [
        { id: '1', displayName: 'John Doe', email: 'john.doe@example.com', phoneNumber: '+1234567890', photoURL: '', providerId: '', rememberMe: true, role: 'admin', uid: 'user1', authUid: 'auth123' },
        { id: '2', displayName: 'Jane Smith', email: 'jane.smith@example.com', phoneNumber: '+9876543210', photoURL: '', providerId: '', rememberMe: true, role: 'user', uid: 'user2', authUid: 'auth456' },
      ];
      component.users$ = of(users);
  
      component.ngOnInit();
  
      tick();
  
      expect(component.totalItems).toBe(2);
      component.searchUsersControl.setValue('Jane');
  
      tick();
      expect(component.filteredUsers).toEqual([{ id: '2', displayName: 'Jane Smith', email: 'jane.smith@example.com', phoneNumber: '+9876543210', photoURL: '', providerId: '', rememberMe: true, role: 'user', uid: 'user2', authUid: 'auth456' }]);
    }));

    it('should return an empty array if no matches are found', () => {
      const users: User[] = [
        { id: '1', displayName: 'John Doe', email: 'john.doe@example.com', phoneNumber: '+1234567890', photoURL: '', providerId: '', rememberMe: true, role: 'admin', uid: 'user1', authUid: 'auth123' },
        { id: '2', displayName: 'Jane Smith', email: 'jane.smith@example.com', phoneNumber: '+9876543210', photoURL: '', providerId: '', rememberMe: true, role: 'user', uid: 'user2', authUid: 'auth456' },
      ];

      const result = component.filterUser(users, 'Nonexistent');

      expect(result).toEqual([]);
    });
  });
});
