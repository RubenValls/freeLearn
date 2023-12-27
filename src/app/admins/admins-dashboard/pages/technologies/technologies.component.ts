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
  modalWith: string = '100%';
  modalHeight: string = '750px';
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
    {label: 'Id', prop: 'id'},
    {label: 'Name', prop: 'name'},
    {label: 'Image', prop: 'imagePath'},
    {label: 'Description', prop: 'description'},
    {label: 'Courses', prop: 'courses'},
  
  ]
  
  onToggleForm(){
    this.isFormVisible = !this.isFormVisible
  }

  onEdit(element: TechnologyType){           
    this.techsService.updateTechnology(element.id!, element).then((data) => {
      this.alertMessages.successMessage('Technology update successfully');
    }).catch((error) => {
      this.alertMessages.errorMessage('Error updating technology', error.message);
    }) 
  }

  onDelete(id:string){    
   this.techsService.deleteTechDoc(id)
   .then((data) => {
    this.alertMessages.successMessage('Technology delete successfully');
   }).catch((error) => {
    this.alertMessages.errorMessage('Error deleting technology', error.message);
  }) 
  }
  
  onModals(element: TechnologyType){
    console.log(element, "modal")
    this.techsService.getTechnologyById(element.id!)    

  }

}
