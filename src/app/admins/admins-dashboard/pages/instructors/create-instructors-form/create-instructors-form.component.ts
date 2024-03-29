import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InstructorsService } from '../instructors-service/instructors.service';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';
@Component({
  selector: 'app-create-instructors-form',
  templateUrl: './create-instructors-form.component.html',
  styleUrls: ['./create-instructors-form.component.scss'],
})
export class CreateInstructorsFormComponent {
  instructorForm: FormGroup;
  @Output() closeForm = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private instructorsService: InstructorsService,
    private alertMessages: AlertsService
  ) {
    this.instructorForm = this.fb.group({
      name: ['', Validators.required],
      imagePath: [''],
      socialMedia: this.fb.group({
        web: [''],
        youtube: [''],
        twitter: [''],
        linkedin: [''],
      }),
      courses: [[]],
      rating: [[]],
    });
  }

  onSubmit() {
    this.addInstructor();
  }

  addInstructor() {
    if (this.instructorForm.valid) {
      this.instructorsService
        .addInstructor(this.instructorForm.value)
        .then((response) => {
          this.alertMessages.successMessage("Instructor created successfully")
          this.instructorForm.reset();
          this.closeForm.emit(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
  
}
