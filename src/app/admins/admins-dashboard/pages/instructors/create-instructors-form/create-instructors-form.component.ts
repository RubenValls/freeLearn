import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Instructor } from '../instructors';
import { InstructorsService } from '../instructors-service/instructors.service';
@Component({
  selector: 'app-create-instructors-form',
  templateUrl: './create-instructors-form.component.html',
  styleUrls: ['./create-instructors-form.component.scss'],
})
export class CreateInstructorsFormComponent {
  instructorForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private instructorsService: InstructorsService
  ) {
    this.instructorForm = this.fb.group({
      name: ['', Validators.required],
      socialMedia: this.fb.group({
        web: [''],
        youtube: [''],
        twitter: [''],
        linkedin: [''],
      }),
      courses: [[]],
    });
    console.log(this.instructorForm);
  }

  onSubmit() {
    this.addInstructor();
  }

  addInstructor() {
    if (this.instructorForm.valid) {
      this.instructorsService
        .addInstructor(this.instructorForm.value)
        .then((response) => {
          alert('Instructor added successfully');
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
  
}
