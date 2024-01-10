import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/admins/admins-dashboard/pages/courses/interface/course';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss']
})
export class CoursePageComponent implements OnInit {
  course:Course | undefined
  courseId: string | undefined;
  instructorsId: string[] | undefined ;
  techsId: string[] | undefined ;

  constructor(
    private route: ActivatedRoute
  ) { 
    this.route.data.subscribe(data => {    
      this.course = data['data'];
    });
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.courseId = params['id'];    
    });  
    this.instructorsId = this.course?.instructorId.map(instructor => instructor.id);
    this.techsId = this.course?.techs.map(tech => tech.id);
  }



}
