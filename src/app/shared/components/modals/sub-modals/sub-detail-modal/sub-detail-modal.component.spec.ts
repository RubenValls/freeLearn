import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubDetailModalComponent } from './sub-detail-modal.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { FormBuilder } from '@angular/forms';

describe('SubDetailModalComponent', () => {
  let component: SubDetailModalComponent;
  let fixture: ComponentFixture<SubDetailModalComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<any>>;
  let store: any;
  let dialog: MatDialog;

  beforeEach(() => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    store = {
      select: jasmine.createSpy().and.returnValue(of({ lessons: [] })),
    };

    TestBed.configureTestingModule({
      declarations: [SubDetailModalComponent],
      imports: [
        SharedModule,
        MatDialogModule,
        StoreModule.forRoot({}),
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: Store, useValue: store },
        { provide: MatDialog, useValue: { open: () => ({ afterClosed: () => of(true) }) }}
      ]
    });
    fixture = TestBed.createComponent(SubDetailModalComponent);
    component = fixture.componentInstance;
    component.data = { editForm: new FormBuilder().group({}) };
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onInit', () => {
    it('should initialize mainForm and lessons on ngOnInit', () => {
      component.ngOnInit();
      expect(component.mainForm).toBeTruthy();
      expect(component.lessons).toEqual([]);
    });
  })

  describe('close', () => {
    it('should close the dialog', () => {
      component.close();
      expect(component.dialogRef.close).toHaveBeenCalled();
    });
  });

  describe('onAddLesson', () => {
    it('should call onAddLesson', () => {
      spyOn(dialog, 'open').and.callThrough();
      component.onAddLesson();
      expect(dialog.open).toHaveBeenCalled();
    });
  })

  describe('deleteLesson', () => {
    it('should call deleteLesson', () => {
      spyOn(dialog, 'open').and.callThrough();
      component.deleteLesson({name: '', videoUrl: ''});
      expect(dialog.open).toHaveBeenCalled();
    });
  })

  describe('editLesson', () => {
    it('should call editLesson', () => {
      spyOn(dialog, 'open').and.callThrough();
      component.editLesson({name: '', videoUrl: ''}, 1);
      expect(dialog.open).toHaveBeenCalled();
    });
  })
});
