import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/admins/admins-dashboard/pages/courses/interface/course';
import { selectCourses } from 'src/app/store/courses/courses.selectors';

@Component({
  selector: 'app-fourth-section-main',
  templateUrl: './fourth-section-main.component.html',
  styleUrls: ['./fourth-section-main.component.scss']
})
export class FourthSectionMainComponent implements OnInit,OnDestroy {

  courses$ = this.store.select(selectCourses);
  courses: Course[] | undefined;

  courseSubscripton: Subscription | undefined

  constructor(
    private store: Store,
  ) { } 

  ngOnInit(): void {
    this.courseSubscripton = this.courses$.subscribe(courses => {
      this.courses = this.getRandomCourses(courses, 8);
    });
  }

  ngOnDestroy(): void {
    this.courseSubscripton?.unsubscribe()
  }

  handleDescription(description: string){
    return description.length > 100 ? description.slice(0, 100) + '...' : description;
  }

  getRandomCourses(courses: any, count: number): Course[] {
    const shuffledCourses = courses.slice(0).sort(() => 0.5 - Math.random());
    return shuffledCourses.slice(0, count);
  }

}

