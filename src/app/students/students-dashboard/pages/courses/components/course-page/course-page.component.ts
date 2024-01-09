import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/admins/admins-dashboard/pages/courses/interface/course';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss']
})
export class CoursePageComponent {
  course:Course | undefined
  constructor(
    private route: ActivatedRoute
  ) { 
    this.route.data.subscribe(data => {    
      this.course = data['data']
    });
  }

}
