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
    this.store.dispatch({ type: 'Fetch Technologies' });
    this.store.dispatch({ type: 'Fetch Instructors' });
  }

}
