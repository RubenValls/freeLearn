import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { effectsActions } from 'src/app/store/effectsActions';

@Component({
  selector: 'app-students-dashboard',
  templateUrl: './students-dashboard.component.html',
  styleUrls: ['./students-dashboard.component.scss']
})
export class StudentsDashboardComponent implements OnInit{

  constructor(
    private store: Store,
  ) { } 

  ngOnInit(): void {
    this.store.dispatch({type: effectsActions.fetchTechnologies});
    this.store.dispatch({type: effectsActions.fetchInstructors});
    this.store.dispatch({type: effectsActions.fetchCourses});
  }
}
