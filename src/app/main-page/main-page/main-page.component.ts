import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { effectsActions } from 'src/app/store/effectsActions';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit{

  constructor(
    private store: Store,
  ) { } 

  ngOnInit(): void {
    this.store.dispatch(effectsActions.fetchTechnologies);
    this.store.dispatch(effectsActions.fetchInstructors);
    this.store.dispatch(effectsActions.fetchCourses);
  }

}
