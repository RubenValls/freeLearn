import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { CoursesMainPageComponent } from './courses-main-page.component';
import { StudentsModule } from 'src/app/students/students.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CoursesMainPageComponent', () => {
  let component: CoursesMainPageComponent;
  let fixture: ComponentFixture<CoursesMainPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StudentsModule, BrowserAnimationsModule],
      declarations: [CoursesMainPageComponent],
      providers: [provideMockStore({ initialState: {} })],  // Proporciona un Store ficticio
    });
    fixture = TestBed.createComponent(CoursesMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
