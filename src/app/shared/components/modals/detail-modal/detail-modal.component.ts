import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdateModalComponent } from '../update-modal/update-modal.component';

@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.scss']
})
export class DetailModalComponent implements OnInit {
  dataGeneral: any;
  title: string = ''
  totalCourses: string | null = null
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
    this.totalCourses = this.data.totalCourses > 0 ? `This technology has ${this.data.totalCourses} associated courses` : "This technology has 0 associated courses"
    this.createDynamicForm();

    this.form.patchValue(this.data.data);
  

  }

  createDynamicForm() {
    this.form = this.builderForm.group({});
    this.rows.forEach((row: any) => {
      if (row.prop !== 'courses') {
        if (row.subFields) {
          const subFormGroup = this.createSubFormGroup(row.subFields);
          this.form.addControl(row.prop, subFormGroup);
        } else {
          this.form.addControl(row.prop, this.builderForm.control('', Validators.required));
        }
      }
    });

  }
  createSubFormGroup(subFields: any[]): FormGroup {
    const subFormGroup: { [key: string]: AbstractControl } = {};
    subFields.forEach((field: any) => {
      if (field.subFields) {
        subFormGroup[field.prop] = this.createSubFormGroup(field.subFields);
      } else {
        subFormGroup[field.prop] = this.builderForm.control('');
      }
    });
    return this.builderForm.group(subFormGroup);
  }

  get socialMediaForm(): FormGroup {
    return this.form.get('socialMedia') as FormGroup;
  }


  close() {
    this.dialogRef.close();
  }

  onDelete() {   
    if (this.data.onDelete) {
      const deleteDialog = this.dialog.open(DeleteModalComponent, {
        width: '400px',
        data: {
          title: this.title,
          onDelete: this.data.onDelete,
          id: this.form.value,
          data: this.data.data
        }
      });

      deleteDialog.afterClosed().subscribe(result => {
        if (result) {
          this.dialogRef.close();
        }
      });
    }
  }

  onEdit() {
    if (this.data.onEdit) {
      const updateDialog = this.dialog.open(UpdateModalComponent, {
        width: '400px',
        data: {
          title: this.title,
          onEdit: this.data.onEdit,
          editData: this.form.value
        }
      })
      updateDialog.afterClosed().subscribe(result => {
        if (result) {
          this.dialogRef.close();
        }
      });
    }

  }
}
