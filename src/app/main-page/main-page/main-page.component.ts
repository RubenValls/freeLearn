import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

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
    this.store.dispatch({ type: 'Fetch Technologies' });
    this.store.dispatch({ type: 'Fetch Instructors' });
  }

}
