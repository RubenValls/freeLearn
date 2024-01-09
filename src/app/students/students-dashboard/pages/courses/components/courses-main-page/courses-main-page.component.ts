import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCourses } from 'src/app/store/courses/courses.selectors';

@Component({
  selector: 'app-courses-main-page',
  templateUrl: './courses-main-page.component.html',
  styleUrls: ['./courses-main-page.component.scss']
})
export class CoursesMainPageComponent implements OnInit {

  courses$ = this.store.select(selectCourses);
  courses: any;
  
    constructor(
      private store: Store,
    
    ) {}
    ngOnInit(): void {
      this.courses$.subscribe((courses) => {
        this.courses = courses;
      });
    }

}
