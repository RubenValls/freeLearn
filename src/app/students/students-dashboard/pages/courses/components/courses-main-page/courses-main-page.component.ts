import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/admins/admins-dashboard/pages/courses/interface/course';
import { selectCourses } from 'src/app/store/courses/courses.selectors';

@Component({
  selector: 'app-courses-main-page',
  templateUrl: './courses-main-page.component.html',
  styleUrls: ['./courses-main-page.component.scss']
})
export class CoursesMainPageComponent implements OnInit, OnDestroy {

  courses$ = this.store.select(selectCourses);
  courseSubscription: Subscription | undefined;
  courses: Course[] = [];;
  filteredCourses: Course[] = [];
  topCourses: Course[] = [];
  name = new FormControl('');
  
    constructor(
      private store: Store,
    
    ) {}
    ngOnInit(): void {
        this.courseSubscription = this.courses$.subscribe((data) => {
        this.courses = [...data]
        this.topCourses = this.courses.slice(0,3)
      });
      this.name.valueChanges.subscribe(value => {
        this.filteredCourses = this.filterByName(this.courses, value || '')
      });
    }

    ngOnDestroy(): void {
      this.courseSubscription?.unsubscribe()
    }

    filterByName(array: Course[], input: string) {
      return array.filter(item => item.name.toLowerCase().includes(input.toLowerCase()));
    }

    getCourses(){
      if(this.filteredCourses.length > 0){
        return this.filteredCourses
      }else{
        return this.courses
      }
    }
}
