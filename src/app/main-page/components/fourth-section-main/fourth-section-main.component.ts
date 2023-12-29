import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Course } from 'src/app/admins/admins-dashboard/pages/courses/interface/course';
import { selectCourses } from 'src/app/store/courses/courses.selectors';

@Component({
  selector: 'app-fourth-section-main',
  templateUrl: './fourth-section-main.component.html',
  styleUrls: ['./fourth-section-main.component.scss']
})
export class FourthSectionMainComponent implements OnInit {

  courses$ = this.store.select(selectCourses);
  courses: Course[] | undefined;

  constructor(
    private store: Store,
  ) { } 

  ngOnInit(): void {
    this.courses$.subscribe(courses => {
      this.courses = [...courses]
    });
  }

  handleDescription(description: string){
    return description.length > 100 ? description.slice(0, 100) + '...' : description
  }

}
