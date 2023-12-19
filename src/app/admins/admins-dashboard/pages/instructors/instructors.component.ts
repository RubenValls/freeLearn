import { Component } from '@angular/core';
import { InstructorsService } from './instructors-service/instructors.service';

@Component({
  selector: 'app-instructors',
  templateUrl: './instructors.component.html',
  styleUrls: ['./instructors.component.scss']
})
export class InstructorsComponent {
  showForm: boolean = false;

  constructor(private instructorsService: InstructorsService){

  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  getInstructors() {
    const c = this.instructorsService.getInstructors().subscribe((response) => {
      console.log(response);
     })
  }

}
