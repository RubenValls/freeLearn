import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UpdateModalComponent } from '../update-modal/update-modal.component';
import { SubDetailModalComponent } from '../sub-modals/sub-detail-modal/sub-detail-modal.component';
import { Store } from '@ngrx/store';
import { selectCourse } from 'src/app/admins/admins-dashboard/pages/courses/store/course/course.selectors';
import { Observable, Subscription } from 'rxjs';
import { Course } from 'src/app/admins/admins-dashboard/pages/courses/interface/course';
import { CourseActions } from 'src/app/admins/admins-dashboard/pages/courses/store/course/course.actions';
import { Instructor } from 'src/app/admins/admins-dashboard/pages/instructors/instructors';
import { TechnologyType } from 'src/app/admins/admins-dashboard/pages/technologies/types/technologies';
import { selectInstructor } from 'src/app/store/instructors/instructors.selectors';
import { selectTechnologies } from 'src/app/store/technologies/tecnologies.selectors';

@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.scss']
})
export class DetailModalComponent implements OnInit, OnDestroy {

  title: string = ''
  totalCourses: string | null = null
  rows: any[] = [];
  form!: FormGroup;
  socialMediaForm!: FormGroup;
  instructorsForSelect$ = this.store.select(selectInstructor);
  techsForSelect$ = this.store.select(selectTechnologies);
  instructorsForSelect: Instructor[] | undefined;
  techsForSelect: TechnologyType[] | undefined;
  techs: any[] = [];
  instructors: any[] = [];
  lessons: any[] = [];
  totalLessons: string | null = null
  rating: string | number = '';
  isCourse: boolean = false;
  course$: Observable<Course> | undefined;
  course: any;
  newValues: any[] = [];
  isUser: boolean = false;

  courseSubscription: Subscription | undefined

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DetailModalComponent>,
    public dialog: MatDialog,
    public builderForm: FormBuilder,
    private store: Store,   
  ) { }

  ngOnInit(): void {    

    if (this.data.title == "Courses") {
      this.course$ = this.store.select(selectCourse);
      this.store.dispatch(CourseActions.addCourse({ course: this.data.data }))
      this.course$.subscribe((course: Course) => {
        this.totalLessons = course.lessons.length > 0 ? `this course has ${course.lessons.length} lessons` : "This course has 0 lessons"
        this.course = course
        this.instructors = course.instructorId
        this.techs = course.techs
      })
      this.instructorsForSelect$.subscribe((instructors) => {
        const allInstructors = [...instructors]      
        this.instructorsForSelect = allInstructors.filter(instructor => 
          !this.instructors.some(existingInstructor => existingInstructor.id === instructor.id)
        );
      });
      this.techsForSelect$.subscribe((techs) => {
        const allTechs = [...techs];
        this.techsForSelect = allTechs.filter(techs => 
          !this.techs.some(existingTech => existingTech.id === techs.id)
        );
      });
    }
    this.rows = this.data?.rows
    this.title = this.data?.title
    this.createDynamicForm();
    this.form.patchValue(this.course ? this.course : this.data.data);
    this.socialMediaForm = this.getFormGroup('socialMedia') as FormGroup;
    this.techs = this.data.data?.techs;
    this.instructors = this.course?.instructorId;
    this.lessons = this.course?.lessons;
    this.rating = this.data?.rating > 0 ? `The raiting is ${this.data.rating} pounts ` : "This course has no rating yet";
    this.isCourse = this.data?.title == "Courses" ? true : false
    this.totalCourses = this.data?.totalCourses > 0 ? `It has ${this.data.totalCourses} associated courses` : "It has 0 associated courses";
    this.totalLessons = this.course?.lessons.length > 0 ? `this course has ${this.course.lessons.length} lessons` : "This course has 0 lessons";
    this.isUser = this.data?.title == "User" ? true : false

  }

   ngOnDestroy(): void {
     this.courseSubscription?.unsubscribe()
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

  openLessons() {
    this.dialog.open(SubDetailModalComponent, {
      width: '1030px',
      height: '650px',
      data: {
        onEdit: this.data.onEdit,
        onDelete: this.data.onDelete,
        editForm: this.form,
      }
    })
  }

  onSelectionChange(event: any) {
    this.newValues = event.value as string[];
  }

  onAddReferences(controlName: string) {
    const currentRefence = controlName === "techs" ? this.techs : this.instructors;
    const newUniqueReference = this.newValues.filter(newReference =>
      !currentRefence.some(currentReference => currentReference.id === newReference.id)
    );
    const updatedReference = [...currentRefence, ...newUniqueReference];

    this.form.get(controlName)?.setValue(updatedReference);
    if (this.data.onEdit) {
      this.store.dispatch(CourseActions.editCourse({ course: { ...this.course, [controlName]: updatedReference, } }))
      this.data.onEdit(this.form.value, true)
    }
    this.newValues = [];
  }

  onDeleteReferences(id: string, subForm: string) {
    if (subForm == "instructors") {
      const instructorsCopy = this.instructors.filter((instructor: any) => instructor.id !== id);
      this.form.get('instructorId')?.setValue(instructorsCopy);
    }
    if (subForm == "techs") {
      const techsCopy = this.techs.filter((tech: any) => tech.id !== id);
      this.form.get('techs')?.setValue(techsCopy);
    }

    const deleteDialog = this.dialog.open(DeleteModalComponent, {
      width: '400px',
      data: {
        onEdit: this.data.onEdit,
        editData: this.form,
      }
    });

    deleteDialog.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(CourseActions.editCourse({ course: this.course }))
      }
    });

  }


}
