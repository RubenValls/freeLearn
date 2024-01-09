import { Component, Input, OnInit } from '@angular/core';
import { Course } from 'src/app/admins/admins-dashboard/pages/courses/interface/course';
import { CoursesService } from 'src/app/admins/admins-dashboard/pages/courses/service/courses.service';

@Component({
  selector: 'app-courses-section',
  templateUrl: './courses-section.component.html',
  styleUrls: ['./courses-section.component.scss']
})
export class CoursesSectionComponent implements OnInit{
  @Input() courses: string[] | undefined 
  instructorCourses: Course[] = []

  constructor( private coursesService: CoursesService ){}

  ngOnInit(): void {
    console.log(this.courses)
    if(this.courses && this.courses?.length > 0){
      this.courses.forEach((courseId) => {
        this.coursesService.getCourseById(courseId).then((course) => this.instructorCourses = this.instructorCourses?.concat(course))
      })
    }
  }
}
