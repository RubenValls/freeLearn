import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectTechnologies } from 'src/app/store/technologies/tecnologies.selectors';

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
}
