import { MatIconModule } from '@angular/material/icon';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CoursesComponent } from './courses.component';
import { Store, StoreModule } from '@ngrx/store';
import { coursesReducer } from 'src/app/store/courses/courses.reducer';

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesComponent ],
      imports: [ MatIconModule, StoreModule.forRoot({ courses: coursesReducer }) ],
      providers: [ Store ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });
  
  it('should toggle watchForm on addCourse', () => {
    component.watchForm = false;
    component.addCourse();
    expect(component.watchForm).toBe(true);
    component.addCourse();
    expect(component.watchForm).toBe(false);
  });
  
});

