import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UpdateModalComponent } from '../../update-modal/update-modal.component';
import { DeleteModalComponent } from '../../delete-modal/delete-modal.component';
import { SubModalCreateComponent } from '../sub-modal-create/sub-modal-create.component';
import { Course, Lesson } from 'src/app/admins/admins-dashboard/pages/courses/interface/course';
import { Store } from '@ngrx/store';
import { selectCourse } from 'src/app/admins/admins-dashboard/pages/courses/store/course/course.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sub-detail-modal',
  templateUrl: './sub-detail-modal.component.html',
  styleUrls: ['./sub-detail-modal.component.scss']
})
export class SubDetailModalComponent implements OnInit {
  mainForm!: FormGroup;
  lessons: any[] = [];
  course$: Observable<Course> | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<Component>,
    public dialog: MatDialog,
    public builderForm: FormBuilder,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.mainForm = this.data.editForm;
    this.course$ = this.store.select(selectCourse);
    this.course$.subscribe((course: Course) => {
      this.lessons = course.lessons
    })
  }

  editLessonForm: FormGroup = this.builderForm.group({
    id: [''],
    name: [''],
    videoUrl: [''],
  });

  onAddLesson() {
    const updateDialog = this.dialog.open(SubModalCreateComponent, {
      width: '500px',
      data: {
        onEdit: this.data.onEdit,
        onDelete: this.data.onDelete,
        editForm: this.mainForm,
        lessons: this.lessons,
      }
    })

  }
  close() {
    this.dialogRef.close();
  }

  deleteLesson(element: Lesson) {
    const lessonCopy = this.lessons.filter((lesson: Lesson) => lesson.id !== element.id);
    this.mainForm.get('lessons')?.setValue(lessonCopy);

    const deleteDialog = this.dialog.open(DeleteModalComponent, {
      width: '400px',
      data: {
        title: 'Delete Lesson',
        onEdit: this.data.onEdit,
        editData: this.mainForm.value,
      }
    })
    deleteDialog.afterClosed().subscribe((result: any) => {
      if (result) {
        this.dialogRef.close();
      }
    });
  }

  editLesson(element: Lesson) {
    const lessonCopy = this.lessons.filter((lesson: Lesson) => lesson.id !== element.id);
    this.mainForm.get('lessons')?.setValue(lessonCopy);

    const updateDialog = this.dialog.open(UpdateModalComponent, {
      width: '400px',
      data: {
        title: 'Edit Lesson',
        onEdit: this.data.onEdit,
        editForm: this.mainForm.value,
      }
    })
    updateDialog.afterClosed().subscribe((result: any) => {
      if (result) {
        this.dialogRef.close();
      }
    });
  }

}