import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HomeFavoritesComponent } from "./home-favorites.component";
import { StudentsModule } from "src/app/students/students.module";
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth, user } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { User } from "src/app/login/types/user";
import { UsersService } from "src/app/shared/services/users/users.service";

describe('HomeFavoritesComponent', () => {
  let component: HomeFavoritesComponent;
  let fixture: ComponentFixture<HomeFavoritesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeFavoritesComponent],
      imports:[
        StudentsModule,
        provideFirestore(() => getFirestore()),
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAuth(() => getAuth()),
      ],
      providers: [ {provide :UsersService, useValue:{ getUserFromStorage: () => {} }}]
    });
    fixture = TestBed.createComponent(HomeFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initialValues', () => {
    expect(component.userFavorites).toBeDefined();
    expect(component.favouriteCourses).toBeDefined();
  });

  it('should get userInfo', () => {
    const userInfo = {
      displayName: 'Test User',
      email: 'testuser@example.com',
      phoneNumber: '1234567890',
      photoURL: null,
      providerId: null,
      rememberMe: true,
      uid: '1',
      authUid: '1',
      favorites: ['Angular', 'React']
    } as User;
    spyOn(component, 'getUserInfo').and.returnValue(userInfo);
    component.ngOnInit();
    expect(component.getUserInfo).toHaveBeenCalled();
  });

  it('should initialize userFavorites correctly', () => {
    const userInfo = {
      displayName: 'Test User',
      email: 'testuser@example.com',
      phoneNumber: '1234567890',
      photoURL: null,
      providerId: null,
      rememberMe: true,
      uid: '1',
      authUid: '1',
      favorites: ['Angular', 'React']
    } as User;
    spyOn(component, 'getUserInfo').and.returnValue(userInfo);
    component.ngOnInit();
    expect(component.userFavorites).toEqual(userInfo?.favorites ? userInfo?.favorites : []);
  });
  
  it('should call getTopicCourses on ngOnInit', () => {
    const userInfo = {
      displayName: 'Test User',
      email: 'testuser@example.com',
      phoneNumber: '1234567890',
      photoURL: null,
      providerId: null,
      rememberMe: true,
      uid: '1',
      authUid: '1',
      favorites: ['Angular', 'React']
    };
    spyOn(component, 'getUserInfo').and.returnValue(userInfo);
    const getTopicCoursesSpy = spyOn(component.courseService, 'getTopicCourses').and.callThrough();
    component.ngOnInit();
    expect(getTopicCoursesSpy).toHaveBeenCalledWith(userInfo?.favorites);
  });
  
});