import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectInstructor } from 'src/app/store/instructors/instructors.selectors';
import { InstructorsService } from './instructors-service/instructors.service';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';
import { Instructor } from './instructors';

@Component({
  selector: 'app-instructors',
  templateUrl: './instructors.component.html',
  styleUrls: ['./instructors.component.scss']
})
export class InstructorsComponent {
  showForm: boolean = false;
  instructors$ = this.store.select(selectInstructor);
  modalWith: string = '1034';
  modalHeight: string = '650px';
  modalTitle: string = 'Trainer';

  tableColumns = [
    { prop: 'name', title: 'Name' },
    { prop: 'imagePath', title: 'Image' },
    { prop: 'courses', title: 'NºCourses' },
    { prop: 'rating', title: 'Rating' },
    { prop: 'socialMedia', title: 'SocialMedia' }
  ];
  rows = [
    { label: 'Id', prop: 'id' },
    { label: 'Name', prop: 'name' },
    { label: 'Image', prop: 'imagePath' },
    { label: 'Courses', prop: 'courses' },
    { label: 'Rating', prop: 'rating' },
    {
      label: 'SocialMedia', prop: 'socialMedia',
      subFields: [
        { label: 'Web', prop: 'web' },
        { label: 'YouTube', prop: 'youtube' },
        { label: 'Twitter', prop: 'twitter' },
        { label: 'LinkedIn', prop: 'linkedin' },
      ],

    },
  ]


  constructor(
    private store: Store,
    private instructorsService: InstructorsService,
    private alertMessages: AlertsService
  ) {
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  onEdit(element: Instructor) {
    this.instructorsService.updateInstructor(element.id!, element).then((data) => {
      this.alertMessages.successMessage('Trainer update successfully');
    }).catch((error) => {
      this.alertMessages.errorMessage('Error updating Trainer', error.message);
    })
  }
  onDelete(id: string) {
    this.instructorsService.deleteInstructor(id)
      .then((data) => {
        this.alertMessages.successMessage('Trainer delete successfully');
      }).catch((error) => {
        this.alertMessages.errorMessage('Error deleting Trainer', error.message);
      })
  }
  onModals(element: Instructor) {
    this.instructorsService.getInstructorById(element.id!)
  }

}
