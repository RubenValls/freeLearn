import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { DetailModalComponent } from './detail-modal.component';
import { MatIconModule } from '@angular/material/icon';

describe('DetailModalComponent', () => {
  let component: DetailModalComponent;
  let fixture: ComponentFixture<DetailModalComponent>;
  let storeMock: any;

  beforeEach(async () => {
    storeMock = {
      select: jasmine.createSpy('select').and.returnValue(of({})),
      dispatch: jasmine.createSpy('dispatch')
    };

    await TestBed.configureTestingModule({
      declarations: [DetailModalComponent],
      imports: [
        MatDialogModule, 
        MatIconModule
      ],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {
          title: '',
          totalCourses: null,
          rows: [],
          form: {},
          socialMediaForm: {},
          techsForm: {},
          techs: [{}],
          instructors: [],
          lessons: [],
          totalLessons: '',
          isCourse: false,
          course$: {},
          course: {}
        } },
        { provide: Store, useValue: storeMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize', () => {
    component.ngOnInit();
    expect(storeMock.select).toHaveBeenCalled();
    expect(storeMock.dispatch).toHaveBeenCalled();
  });
});
