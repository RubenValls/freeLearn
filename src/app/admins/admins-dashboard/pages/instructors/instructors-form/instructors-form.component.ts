import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Instructor } from '../instructors';
@Component({
  selector: 'app-instructors-form',
  templateUrl: './instructors-form.component.html',
  styleUrls: ['./instructors-form.component.scss']
})
export class InstructorsFormComponent {

  instructorForm: FormGroup;


  constructor(private fb: FormBuilder){
    this.instructorForm = this.fb.group({
      name: ["", Validators.required],
      socialMedia: this.fb.group({
        web: ["", ],
        youtube: ["", ],
        twitter: [""],
        linkedin: [""],
      }),
      courses: [[]], 
    });
    console.log(this.instructorForm);
  }

  onSubmit() {
    if (this.instructorForm.valid) {
      const instructorData: Instructor = this.instructorForm.value;
    }
  }

  


}
