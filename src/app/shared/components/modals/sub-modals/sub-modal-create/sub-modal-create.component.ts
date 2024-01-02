import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { CourseActions } from 'src/app/admins/admins-dashboard/pages/courses/store/course/course.actions';

@Component({
  selector: 'app-sub-modal-create',
  templateUrl: './sub-modal-create.component.html',
  styleUrls: ['./sub-modal-create.component.scss']
})
export class SubModalCreateComponent implements OnInit {
  mainForm!: FormGroup;
  lessons: any[] = [];


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<Component>,
    public dialog: MatDialog,
    public builderForm: FormBuilder,
    private store: Store,
  ) { }
  ngOnInit(): void {
    this.mainForm = this.data.editForm;
    this.lessons = this.data.lessons;
  }

  createLessonForm: FormGroup = this.builderForm.group({
    id: [''],
    name: [''],
    videoUrl: [''],
  });

  onAddLesson() {   
    const lessonsCopy = [...this.lessons]; 

    const randomNumber = Math.floor(Math.random() * 1000);
    randomNumber.toString(16);    
    const generateId = `lesson-${lessonsCopy.length}-${randomNumber}`;   

    this.createLessonForm.get('id')?.setValue(generateId);
    const newLesson = this.createLessonForm.value;
    lessonsCopy.push(newLesson);
    this.mainForm.get('lessons')?.setValue(lessonsCopy);
    if (this.data.onEdit) {
      this.data.onEdit(this.mainForm.value);
      this.store.dispatch(CourseActions.editCourse({course: this.mainForm.value}))
      this.dialogRef.close()
    }
  }

}
