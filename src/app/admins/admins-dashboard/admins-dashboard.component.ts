import { effectsActions } from './../../store/effectsActions';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';



@Component({
  selector: 'app-admins-dashboard',
  templateUrl: './admins-dashboard.component.html',
  styleUrls: ['./admins-dashboard.component.scss']
})
export class AdminsDashboardComponent {
  constructor(
    private store: Store,
  ) { } 

  ngOnInit(): void {
    this.store.dispatch(effectsActions.fetchTechnologies);
    this.store.dispatch(effectsActions.fetchInstructors);
    this.store.dispatch(effectsActions.fetchCourses);
    this.store.dispatch(effectsActions.fetchUsers);
  }

}
