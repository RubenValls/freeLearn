import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Instructor } from 'src/app/admins/admins-dashboard/pages/instructors/instructors';
import { selectInstructor } from 'src/app/store/instructors/instructors.selectors';

@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.scss']
})
export class TrainersComponent implements OnInit, OnDestroy{
  instructors$ = this.store.select(selectInstructor);
  instructorsSubscription: Subscription | undefined;
  instructors: Instructor[] = []

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.instructorsSubscription = this.instructors$.subscribe((data) => {
      this.instructors = [...data]
      console.log(data)
    })
  }

  ngOnDestroy(): void {
    this.instructorsSubscription?.unsubscribe()
  }
}
