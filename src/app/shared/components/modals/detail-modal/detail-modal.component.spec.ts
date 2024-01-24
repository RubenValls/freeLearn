import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { DetailModalComponent } from './detail-modal.component';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'src/app/shared/shared.module';

describe('DetailModalComponent', () => {
  let component: DetailModalComponent;
  let fixture: ComponentFixture<DetailModalComponent>;
  let storeMock: any;
  let mockDialogRef = {
    close: jasmine.createSpy('close'),
  };
  let dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of({}), close: null });
  dialogRefSpyObj.componentInstance = { body : '' };
  let dialog: MatDialog;

  beforeEach(async () => {
    storeMock = {
      select: jasmine.createSpy('select').and.returnValue(of({})),
      dispatch: jasmine.createSpy('dispatch')
    };

    await TestBed.configureTestingModule({
      declarations: [DetailModalComponent],
      imports: [
        SharedModule,
        MatDialogModule, 
        MatIconModule,
        ReactiveFormsModule,
      ],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: mockDialogRef },
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
        { provide: Store, useValue: storeMock },
        { provide: MatDialog, useValue: { open: () => ({ afterClosed: () => of(true) }) } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailModalComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize', () => {
    spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  });

  describe('createDynamicForm', () => {
    it('should create form controls for each row', () => {
      component.rows = [
        { prop: 'test1', subFields: null },
        { prop: 'test2', subFields: null },
        { prop: 'courses', subFields: null },
        { prop: 'test3', subFields: ['sub1', 'sub2'] }
      ];
      component.createDynamicForm();
      expect(Object.keys(component.form.controls)).toEqual(['test1', 'test2', 'test3']);
    });
  });

  describe('createSubFormGroup', () => {
    it('should create form controls for each subField', () => {
      const field = {
        subFields: [
          { prop: 'test1' },
          { prop: 'test2' },
        ]
      };
      const formGroup = component.createSubFormGroup(field);
      if (formGroup instanceof FormGroup) {
        expect(Object.keys(formGroup.controls)).toEqual(['test1', 'test2']);
      }
    });
  
    it('should return a form control if no subFields', () => {
      const field = null;
      const formControl = component.createSubFormGroup(field);
      if (formControl instanceof FormControl) {
        expect(formControl.value).toBe('');
      }
    });
  });

  describe('createSubFormGroupFromObject', () => {
    it('should create form controls for each subField', () => {
      const subFields = [
        { prop: 'test1', subFields: null },
        { prop: 'test2', subFields: null },
      ];
      const formGroup = component.createSubFormGroup(subFields);
      if (formGroup instanceof FormGroup) {
        expect(Object.keys(formGroup.controls)).toEqual(['test1', 'test2']);
      }
    });

    it('should create nested form groups for subFields with subFields', () => {
      const subFields = [
        { prop: 'test1', subFields: [{ prop: 'nested1' }, { prop: 'nested2' }] },
      ];
      const formGroup = component.createSubFormGroup(subFields);
      if (formGroup instanceof FormGroup) {
        expect(formGroup.get('test1') instanceof FormGroup).toBe(true);
        expect(Object.keys((formGroup.get('test1') as FormGroup).controls)).toEqual(['nested1', 'nested2']);
      }
    });
  });

  describe('getFormGroup', () => {
    it('should return the FormGroup for the given section name', () => {
      const sectionName = 'testSection';
      const testGroup = new FormGroup({});

      component.form = new FormGroup({
        [sectionName]: testGroup
      });

      const result = component.getFormGroup(sectionName);

      expect(result).toEqual(testGroup);
    });

    it('should return null if no FormGroup exists for the given section name', () => {
      const sectionName = 'nonExistentSection';

      const result = component.getFormGroup(sectionName);

      expect(result).toBeNull();
    });
  });

  describe('close', () => {
    it('should close the dialog', () => {
      component.close();
      expect(component.dialogRef.close).toHaveBeenCalled();
    });
  });

  describe('onDelete', () => {
    it('should not call onDelete if not onDelete', () => {
      spyOn(dialog, 'open').and.callThrough();
      component.onDelete();
      expect(dialog.open).not.toHaveBeenCalled();
    });
  })

  describe('onEdit', () => {
    it('should not call onEdit if not onEdit', () => {
      spyOn(dialog, 'open').and.callThrough();
      component.onEdit();
      expect(dialog.open).not.toHaveBeenCalled();
    });
  })

  describe('openLessons', () => {
    it('should call openLessons', () => {
      spyOn(dialog, 'open').and.callThrough();
      component.openLessons();
      expect(dialog.open).toHaveBeenCalled();
    });
  })

  describe('onSelectionChange', () => {
    it('should call onSelectionChange', () => {
      const event = { value: ['value1', 'value2'] };
      component.onSelectionChange(event);
      expect(component.newValues).toEqual(['value1', 'value2']);
    });
  })

  describe('onAddReferences', () => {
    it('should call onAddReferences', () => {
      component.form = new FormBuilder().group({ techs: [] });
      component.techs = [{ id: '1' }];
      component.newValues = [{ id: '2' }];
      component.onAddReferences('techs');
      expect(component.form.get('techs')?.value).toEqual([{ id: '1' }, { id: '2' }]);
      expect(component.newValues).toEqual([]);
    });
  })

  describe('onDeleteReferences', () => {
    it('should call onDeleteReferences for instructors', () => {
      spyOn(dialog, 'open').and.callThrough();
      component.form = new FormBuilder().group({ instructorId: [] });
      component.instructors = [{ id: '1' }];
      component.onDeleteReferences('1', 'instructors');
      expect(component.form.get('instructorId')?.value).toEqual([]);
      expect(dialog.open).toHaveBeenCalled();
    });
  
    it('should call onDeleteReferences for techs', () => {
      spyOn(dialog, 'open').and.callThrough();
      component.form = new FormBuilder().group({ techs: [] });
      component.techs = [{ id: '1' }];
      component.onDeleteReferences('1', 'techs');
      expect(component.form.get('techs')?.value).toEqual([]);
      expect(dialog.open).toHaveBeenCalled();
    });
  });

  describe('onSelectionChange', () => {
    it('should call onSelectionChange', () => {
      const event = { value: ['value1', 'value2'] };
      component.onSelectionChange(event);
      expect(component.newValues).toEqual(['value1', 'value2']);
    });
  });

  describe('onAddReferences', () => {
    it('should call onAddReferences', () => {
      component.form = new FormBuilder().group({ techs: [] });
      component.techs = [{ id: '1' }];
      component.newValues = [{ id: '2' }];
      component.onAddReferences('techs');
      expect(component.form.get('techs')?.value).toEqual([{ id: '1' }, { id: '2' }]);
      expect(component.newValues).toEqual([]);
    });
  });

  describe('onDeleteReferences', () => {
    it('should call onDeleteReferences for instructors', () => {
      spyOn(dialog, 'open').and.callThrough();
      component.form = new FormBuilder().group({ instructorId: [] });
      component.instructors = [{ id: '1' }];
      component.onDeleteReferences('1', 'instructors');
      expect(component.form.get('instructorId')?.value).toEqual([]);
      expect(dialog.open).toHaveBeenCalled();
    });
  
    it('should call onDeleteReferences for techs', () => {
      spyOn(dialog, 'open').and.callThrough();
      component.form = new FormBuilder().group({ techs: [] });
      component.techs = [{ id: '1' }];
      component.onDeleteReferences('1', 'techs');
      expect(component.form.get('techs')?.value).toEqual([]);
      expect(dialog.open).toHaveBeenCalled();
    });
  });

  it('should create sub form group from object', () => {
    const subFields = [
      { prop: 'subField1', subFields: [] },
      { prop: 'subField2', subFields: [] },
      { prop: 'subField3', subFields: [] },
    ];
  
    const result = component.createSubFormGroupFromObject(subFields);
  
    expect(result instanceof FormGroup).toBe(true);
    expect(result.controls['subField1']).toBeDefined();
    expect(result.controls['subField2']).toBeDefined();
    expect(result.controls['subField3']).toBeDefined();
  });

  it('should create sub form group with builderForm.control when subFields are not present', () => {
    const subFields = [
      { prop: 'subField1' },
      { prop: 'subField2' },
      { prop: 'subField3' },
    ];
  
    const result = component.createSubFormGroupFromObject(subFields);
  
    expect(result instanceof FormGroup).toBe(true);
    expect(result.controls['subField1']).toBeDefined();
    expect(result.controls['subField2']).toBeDefined();
    expect(result.controls['subField3']).toBeDefined();
    expect(result.controls['subField1'] instanceof FormControl).toBe(true);
    expect(result.controls['subField2'] instanceof FormControl).toBe(true);
    expect(result.controls['subField3'] instanceof FormControl).toBe(true);
  });
  
  
});
