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

  tableColumns = [
    { prop: 'name', title: 'Name' },
   
    { prop: 'imageUrl', title: 'Image' },
    { prop: 'techs', title: 'Technologies' },
    { prop: 'instructorId', title: 'Instructor' },
    { prop: 'introductionURL', title: 'Introduction' },
    { prop: 'lessons', title: 'NºLessons'},
    { prop: 'rating', title: 'Rating'},
  ];

  constructor(
    private store: Store,
  ) { } 

  ngOnInit(): void {
    
  }
  addCourse() {
    this.watchForm = !this.watchForm;
  }

}
