import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/admins/admins-dashboard/pages/courses/interface/course';
import { selectCourses } from 'src/app/store/courses/courses.selectors';
import { randomArray } from 'src/app/students/functions/random-array';

@Component({
  selector: 'app-home-courses',
  templateUrl: './home-courses.component.html',
  styleUrls: ['./home-courses.component.scss']
})
export class HomeCoursesComponent {
  courses$ = this.store.select(selectCourses);
  courses: Course[] | undefined;
  coursesSubscription: Subscription | undefined;


  constructor(private store: Store, ){}

  ngOnInit() {
    this.coursesSubscription = this.courses$.subscribe((course) => {
      this.courses = [...course]; 
      this.courses = randomArray(this.courses, 4)
    });
  }

  ngOnDestroy(): void {
    this.coursesSubscription?.unsubscribe();
  }
}
