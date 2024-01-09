import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  instructors: Instructor[] = [];
  filteredInstructors: Instructor[] = [];
  topInstructors: Instructor[] = [];
  name = new FormControl('');

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.instructorsSubscription = this.instructors$.subscribe((data) => {
      this.instructors = [...data]
      this.topInstructors = this.instructors.slice(0,3)
    })
    this.name.valueChanges.subscribe(value => {
      this.filteredInstructors = this.filterByName(this.instructors, value || '')
    });
  }

  ngOnDestroy(): void {
    this.instructorsSubscription?.unsubscribe()
  }

  filterByName(array: Instructor[], input: string) {
    return array.filter(item => item.name.toLowerCase().includes(input.toLowerCase()));
  }

  getInstructors(){
    if(this.filteredInstructors.length > 0){
      return this.filteredInstructors
    }else{
      return this.instructors
    }
  }
}
