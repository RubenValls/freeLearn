import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectTechnologies } from 'src/app/store/technologies/tecnologies.selectors';
import { TechnologyType } from './types/technologies';
import { TechService } from './service/tech.service';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';

@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.scss']
})
export class TechnologiesComponent {
  isFormVisible = false
  technologies$ = this.store.select(selectTechnologies);
  modalWith: string = '1034';
  modalHeight: string = '650px';
  modalTitle: string = 'Technology';

  constructor(
    private store: Store,
    private techsService: TechService,
    private alertMessages: AlertsService

  ) { }

  tableColumns = [
    { prop: 'name', title: 'Name' },
    { prop: 'imagePath', title: 'Image' },
    { prop: 'courses', title: 'NºCourses' },
    { prop: 'description', title: 'Description' }

  ];

  rows = [
    { label: 'Id', prop: 'id' },
    { label: 'Name', prop: 'name' },
    { label: 'Image', prop: 'imagePath' },
    { label: 'Description', prop: 'description' },
    { label: 'Courses', prop: 'courses' },

  ]

  onToggleForm() {
    this.isFormVisible = !this.isFormVisible
  }

  onEdit(element: TechnologyType) {
    this.techsService.updateTechnology(element.id!, element).then((data) => {
      this.alertMessages.successMessage('Technology update successfully');
    }).catch((error) => {
      this.alertMessages.errorMessage('Error updating technology', error.message);
    })
  }

  async onDelete(id: string) {
    const tech = this.techsService.getTechnologyById(id)
    if((await tech).courses.length == 0){
      this.techsService.deleteTechDoc(id)
      this.alertMessages.successMessage('Technology delete successfully');
    }else{
      this.alertMessages.errorMessage("You can't delete it, contains courses")
    }
  }

  onModals(element: TechnologyType) {
    this.techsService.getTechnologyById(element.id!)
  }

}
