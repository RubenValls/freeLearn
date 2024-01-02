import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DeleteModalComponent>,
  ) { }

  onDelete() {
    if (this.data.onDelete) { this.data.onDelete(this.data.id) };

    if (this.data.onEdit) { this.data.onEdit(this.data.editData) }
    this.dialogRef.close();
  }
  close() {
    this.dialogRef.close();
  }


}
