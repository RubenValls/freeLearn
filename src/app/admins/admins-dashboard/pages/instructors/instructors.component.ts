import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectInstructor } from 'src/app/store/instructors/instructors.selectors';

@Component({
  selector: 'app-instructors',
  templateUrl: './instructors.component.html',
  styleUrls: ['./instructors.component.scss']
})
export class InstructorsComponent {
  showForm: boolean = false;
  instructors$ = this.store.select(selectInstructor);

  tableColumns = [
    { prop: 'name', title: 'Name' },
    { prop: 'imagePath', title: 'Image' },
    { prop: 'courses', title: 'NºCourses' },
    { prop: 'rating', title: 'Rating' },
    { prop: 'socialMedia', title: 'SocialMedia'}
    
  ];

  constructor(private store: Store,){
    
  }

  
  toggleForm() {
    this.showForm = !this.showForm;
    
  }

}
