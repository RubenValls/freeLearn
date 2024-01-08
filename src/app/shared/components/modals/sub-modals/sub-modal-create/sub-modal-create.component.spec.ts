import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubModalCreateComponent } from './sub-modal-create.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

describe('SubModalCreateComponent', () => {
  let component: SubModalCreateComponent;
  let fixture: ComponentFixture<SubModalCreateComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<any>>;

  beforeEach(() => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    TestBed.configureTestingModule({
      declarations: [SubModalCreateComponent],
      imports: [
        SharedModule,
        MatDialogModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({}),
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: mockDialogRef }
      ]
    });
    fixture = TestBed.createComponent(SubModalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onInit', () => {
    it('should initialize mainForm and lessons on ngOnInit', () => {
      component.data = { editForm: new FormBuilder().group({}), lessons: [] };
      component.ngOnInit();
      expect(component.mainForm).toBeTruthy();
      expect(component.lessons).toEqual([]);
    });
  })

  describe('onAddLesson', () => {
    it('should add a lesson when onAddLesson is called', () => {
      const lessonFormValue = { id: '', name: 'Test Lesson', videoUrl: 'http://test.com' };
      component.lessons = [];
      component.mainForm = new FormGroup({
        lessons: new FormControl([])
      })
      component.lessonForm.setValue(lessonFormValue);
      component.onAddLesson();
      expect(component.mainForm.get('lessons')?.value[0].name).toEqual(lessonFormValue.name);
      expect(component.mainForm.get('lessons')?.value[0].videoUrl).toEqual(lessonFormValue.videoUrl);
    });
  })

  describe('onEditLesson', () => {
    it('should edit a lesson when onEditLesson is called', () => {
      const lessonFormValue = { id: '1', name: 'Test Lesson', videoUrl: 'http://test.com' };
      const updatedLessonFormValue = { id: '1', name: 'Updated Test Lesson', videoUrl: 'http://updatedtest.com' };
      component.lessons = [lessonFormValue];
      component.mainForm = new FormGroup({
        lessons: new FormControl(component.lessons)
      });
      component.data = { index: 0 };
      component.lessonForm.setValue(updatedLessonFormValue);
      component.onEditLesson();
      expect(component.mainForm.get('lessons')?.value[0]).toEqual(updatedLessonFormValue);
    });
  });

  describe('close', () => {
    it('should close the dialog', () => {
      component.close();
      expect(component.dialogRef.close).toHaveBeenCalled();
    });
  });
});
