import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UpdateModalComponent } from '../../update-modal/update-modal.component';
import { DeleteModalComponent } from '../../delete-modal/delete-modal.component';
import { SubModalCreateComponent } from '../sub-modal-create/sub-modal-create.component';

@Component({
  selector: 'app-sub-detail-modal',
  templateUrl: './sub-detail-modal.component.html',
  styleUrls: ['./sub-detail-modal.component.scss']
})
export class SubDetailModalComponent implements OnInit {
  mainForm!: FormGroup;
  lessons: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<Component>,
    public dialog: MatDialog,
    public builderForm: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.mainForm = this.data.editForm;
    this.lessons = this.data.lessons;
  }

  onEdit() {
  }

  onDelete() {
  }

  onAddLesson() {
    const updateDialog = this.dialog.open(SubModalCreateComponent, {
      width: '300px',
      height: '200px',
      data: {       
        onEdit: this.data.onEdit,
        onDelete: this.data.onDelete,
        editForm: this.mainForm,
        lessons: this.lessons,    
      }
    })
   
  }
}