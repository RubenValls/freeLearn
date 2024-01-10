import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/admins/admins-dashboard/pages/courses/interface/course';
import { CoursesService } from 'src/app/admins/admins-dashboard/pages/courses/service/courses.service';
import { TechService } from 'src/app/admins/admins-dashboard/pages/technologies/service/tech.service';
import { TechnologyType } from 'src/app/admins/admins-dashboard/pages/technologies/types/technologies';


@Component({
  selector: 'app-tech-page',
  templateUrl: './tech-page.component.html',
  styleUrls: ['./tech-page.component.scss']
})
export class TechPageComponent implements OnInit{

  tech: TechnologyType | undefined;
  
  techId: string = '';
  techSubscription: Subscription | undefined;
  techIdSubscription: Subscription | undefined;
  techCourses: Course[] = []
  techCoursesId: string[] = []
  
  constructor(
    private route: ActivatedRoute,
    private courseService: CoursesService
    ) {
    
    
  }

  ngOnInit(): void {
    this.techSubscription = this.route.data.subscribe(data => {
      this.tech = data['data']
      this.techCoursesId = data['data'].courses
      
      console.log(this.techCourses);
    });
    this.techIdSubscription = this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      this.techId = idParam ? idParam : ''
    })

    this.courseService.getTopicCourses(this.techCoursesId).then(courses => this.techCourses = courses)
  
  }


}
