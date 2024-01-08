import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCourses } from 'src/app/store/courses/courses.selectors';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
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
