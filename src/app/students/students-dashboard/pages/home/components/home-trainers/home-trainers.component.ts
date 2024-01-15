import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Instructor } from 'src/app/admins/admins-dashboard/pages/instructors/instructors';
import { selectInstructor } from 'src/app/store/instructors/instructors.selectors';
import { randomArray } from 'src/app/students/functions/rondom-array';

@Component({
  selector: 'app-home-trainers',
  templateUrl: './home-trainers.component.html',
  styleUrls: ['./home-trainers.component.scss']
})
export class HomeTrainersComponent {
  trainers$ = this.store.select(selectInstructor);
  trainers: Instructor[] | undefined;
  trainersSubscription: Subscription | undefined;


  constructor(private store: Store, ){}

  ngOnInit() {
    this.trainersSubscription = this.trainers$.subscribe((trainer) => {
      this.trainers = [...trainer]; 
      this.trainers = randomArray(this.trainers, 4)
    });
  }

  ngOnDestroy(): void {
    this.trainersSubscription?.unsubscribe();
  }
}
