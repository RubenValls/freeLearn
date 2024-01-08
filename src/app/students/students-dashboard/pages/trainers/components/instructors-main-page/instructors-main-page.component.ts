import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Instructor } from 'src/app/admins/admins-dashboard/pages/instructors/instructors';
import { selectInstructor } from 'src/app/store/instructors/instructors.selectors';

@Component({
  selector: 'app-instructors-main-page',
  templateUrl: './instructors-main-page.component.html',
  styleUrls: ['./instructors-main-page.component.scss']
})
export class InstructorsMainPageComponent implements OnInit, OnDestroy{
  instructors$ = this.store.select(selectInstructor);
  instructorsSubscription: Subscription | undefined;
  instructors: Instructor[] = []

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.instructorsSubscription = this.instructors$.subscribe((data) => {
      this.instructors = [...data]
    })
  }

  ngOnDestroy(): void {
    this.instructorsSubscription?.unsubscribe()
  }
}
