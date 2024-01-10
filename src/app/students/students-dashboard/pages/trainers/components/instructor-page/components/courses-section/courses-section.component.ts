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

  async ngOnInit(): Promise<void> {
    if(this.courses && this.courses?.length > 0){
      try {
        this.instructorCourses = await this.coursesService.getTopicCourses(this.courses ? this.courses : []);
      } catch (error) {
          console.error(error);
      }
    }
  }
}
