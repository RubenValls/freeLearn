import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.scss']
})
export class UpdateModalComponent implements OnInit {
  title: string = ''

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UpdateModalComponent>,
    public dialog: MatDialog,    
  ) { } 
  ngOnInit(): void {
    this.title = this.data.title
  }

  onUpdate() {  
      if(this.data.onEdit) {
      this.data.onEdit(this.data.editData);
      this.dialogRef.close(true);
    }
  }
  close() {
    this.dialogRef.close("pizza!");
   }
}
