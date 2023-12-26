import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectTechnologies } from 'src/app/store/technologies/tecnologies.selectors';
import { TechnologyType } from './types/technologies';
import { TechService } from './service/tech.service';

@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.scss']
})
export class TechnologiesComponent {
  isFormVisible = false
  technologies$ = this.store.select(selectTechnologies);

  constructor(
    private store: Store,
    private techsService: TechService

  ) { } 

  tableColumns = [
    { prop: 'name', title: 'Name' },
    { prop: 'imagePath', title: 'Image' },
    { prop: 'courses', title: 'Nº Courses' },
    { prop: 'description', title: 'Description' }
    
  ];
  
  onToggleForm(){
    this.isFormVisible = !this.isFormVisible
  }

  onEdit(){
     
   
  }
  onDelete(){
    alert( this.technologies$.subscribe(
      data => console.log(data[0].description)
    ))

  }
  onDetail(){
    this.technologies$.subscribe( data => this.techsService.getTechnologyById(data[0].id! ).then( console.log))  
  }

}
