import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.scss']
})
export class DetailModalComponent implements OnInit {
  dataGeneral: any;
  title: string = ''
  totalCourses: number = 0
  rows: any[] = [];
  form!: FormGroup; 

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DetailModalComponent>,
    public dialog: MatDialog,
    public builderForm: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.dataGeneral = this.data
    this.rows = this.data.rows
    this.title = this.data.title
    this.totalCourses = this.data.totalCourses
    this.createDynamicForm(); 
    this.form.patchValue(this.data.data);
    console.log(this.data.data);
  }

  createDynamicForm() {
    this.form = this.builderForm.group({});
    this.rows.forEach((row: any) => {
      if(row.prop !== 'id' || row.prop !== 'courses'){
        this.form.addControl(row.prop, this.builderForm.control('', Validators.required));
        }      
    });
  
  }
  close() {
    this.dialogRef.close();
  }

  onDelete() {
    if(this.data.onDelete){
      this.dialog.open(DeleteModalComponent, {
        width: '400px',
        data: {
          title: this.title,
          onDelete: this.data.onDelete,
          id:this.form.value,
          data: this.data.data
        }
      });
     
      this.dialogRef.close();
    }
  }

  onEdit() {  
    if(this.form.valid && this.data.onEdit){
      console.log(this.form.value);
      this.data.onEdit(this.form.value)    

      this.dialogRef.close();
    }

  }
}
