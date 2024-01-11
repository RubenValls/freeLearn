import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechsMainPageComponent } from './techs-main-page.component';
import { provideMockStore } from '@ngrx/store/testing';
import { StudentsModule } from 'src/app/students/students.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TechsMainPageComponent', () => {
  let component: TechsMainPageComponent;
  let fixture: ComponentFixture<TechsMainPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TechsMainPageComponent],
      imports: [StudentsModule, BrowserAnimationsModule],
      providers: [provideMockStore({ initialState: {} })],
    });
    fixture = TestBed.createComponent(TechsMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
