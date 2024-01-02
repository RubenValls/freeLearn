import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { CourseActions } from 'src/app/admins/admins-dashboard/pages/courses/store/course/course.actions';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DeleteModalComponent>,
    private store: Store
  ) { }

  onDelete() {
    if (this.data.onDelete) { this.data.onDelete(this.data.id) };

    if (this.data.onEdit) { 
      this.data.onEdit(this.data.editData);
      this.store.dispatch(CourseActions.editCourse({course: this.data.editData})) 
    }
    this.dialogRef.close();
  }
  close() {
    this.dialogRef.close();
  }


}
