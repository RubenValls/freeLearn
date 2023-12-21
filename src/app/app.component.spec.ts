import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import firebase from 'firebase/compat/app';
import { environment } from 'src/environments/environment';
import { RouterModule } from '@angular/router';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterModule]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize firebase on init', () => {
    spyOn(firebase, 'initializeApp');
    component.ngOnInit();
    expect(firebase.initializeApp).toHaveBeenCalledWith(environment.firebaseConfig);
  });
});
