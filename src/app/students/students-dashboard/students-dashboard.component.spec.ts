import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsDashboardComponent } from './students-dashboard.component';
import { StudentsModule } from '../students.module';
import { RouterTestingModule } from '@angular/router/testing';
import { effectsActions } from 'src/app/store/effectsActions';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('StudentsDashboardComponent', () => {
  let component: StudentsDashboardComponent;
  let fixture: ComponentFixture<StudentsDashboardComponent>;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentsDashboardComponent],
      imports: [
        StudentsModule,
        RouterTestingModule,
      ],
      providers: [
        provideMockStore(),
      ]
    });
    fixture = TestBed.createComponent(StudentsDashboardComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch fetchTechnologies on ngOnInit', () => {
    const action = effectsActions.fetchTechnologies;
    const spy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith(action);
  });

  it('should dispatch fetchInstructors on ngOnInit', () => {
    const action = effectsActions.fetchInstructors;
    const spy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith(action);
  });

  it('should dispatch fetchCourses on ngOnInit', () => {
    const action = effectsActions.fetchCourses;
    const spy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith(action);
  });
});
