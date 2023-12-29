import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  socialMediaForm!: FormGroup;
  techsForm!: FormGroup;
  techs: any[] = [];
  instructors: any[] = [];
  lessons: string | number = '';

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
    this.socialMediaForm = this.getFormGroup('socialMedia') as FormGroup;
    this.techsForm = this.getFormGroup('techs') as FormGroup;
    this.techs = this.data.data.techs 
    this.instructors = this.data.data.instructorId
    this.lessons = this.data.data.lessons.length > 0 ? this.data.data.lessons.length : "This course has 0 lessons"
 
  }

  createDynamicForm() {
    this.form = this.builderForm.group({});
    this.rows.forEach((row: any) => {
      if (row.prop !== 'courses') {
        if (row.subFields) {
          if (row.prop !== "socialMedia") {
            const subFormGroup = this.createSubFormGroup(row.subFields);
            this.form.addControl(row.prop, subFormGroup);
          } else {

            const subFormGroup = this.createSubFormGroupFromObject(row.subFields);
            this.form.addControl(row.prop, subFormGroup);
          }
        }

        else {
          this.form.addControl(row.prop, this.builderForm.control('', Validators.required));
        }
      }
    });

  }

  createSubFormGroup(field: any): FormGroup | FormControl {
    if (!field) {
      return this.builderForm.control('');
    }

    if (field.subFields) {
      const subFormGroup: { [key: string]: AbstractControl } = {};

      field.subFields.forEach((subField: any) => {
        subFormGroup[subField.prop] = this.createSubFormGroup(subField);
      });

      return this.builderForm.group(subFormGroup);
    } else {
      return this.builderForm.control('');
    }
  }

  createSubFormGroupFromObject(subFields: any[]): FormGroup {
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

  

  getFormGroup(sectionName: string): FormGroup | null {
    const formGroup = this.form.get(sectionName) as FormGroup;
    return formGroup || null;
  }
  getSubFieldControl(controlName: string): FormControl {
    return this.techsForm.get(controlName) as FormControl;
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
