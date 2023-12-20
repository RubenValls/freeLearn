import { Component, OnInit } from '@angular/core';
import { CoursesService } from './service/courses.service';
import { Store } from '@ngrx/store';
import { selectCourses } from 'src/app/store/courses/courses.selectors';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  watchForm: boolean = false;
  courses$ = this.store.select(selectCourses);

  constructor(
    private coursesService: CoursesService,
    private store: Store,
  ) { } 

  ngOnInit(): void {
    this.store.dispatch({ type: 'Fetch Courses' });
  }
  addCourse() {
    this.watchForm = !this.watchForm;
  }

}
