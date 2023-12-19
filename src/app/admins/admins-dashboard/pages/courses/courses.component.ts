import { Component, OnInit } from '@angular/core';
import { CoursesService } from './service/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  watchForm: boolean = false;
  constructor(
    private coursesService: CoursesService,
  ) { } 
  ngOnInit(): void {
   
  }
  addCourse() {
    this.watchForm = !this.watchForm;
  }

}
