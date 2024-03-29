import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/admins/admins-dashboard/pages/courses/interface/course';
import { CoursesService } from 'src/app/admins/admins-dashboard/pages/courses/service/courses.service';
import { TechnologyType } from 'src/app/admins/admins-dashboard/pages/technologies/types/technologies';


@Component({
  selector: 'app-tech-page',
  templateUrl: './tech-page.component.html',
  styleUrls: ['./tech-page.component.scss']
})
export class TechPageComponent implements OnInit, OnDestroy{

  tech: TechnologyType | undefined;
  
  techId: string = '';
  techSubscription: Subscription | undefined;
  techIdSubscription: Subscription | undefined;
  techCourses: Course[] = []
  techCoursesId: string[] = []
  
  constructor(
    public route: ActivatedRoute,
    public courseService: CoursesService
    ) {
    
    
  }

  ngOnInit(): void {
    this.techSubscription = this.route.data.subscribe(data => {
      this.tech = data['data']
      this.techCoursesId = data['data'].courses
    });
    this.techIdSubscription = this.route?.paramMap?.subscribe((params) => {
      const idParam = params.get('id');
      this.techId = idParam ? idParam : ''
    })

    this.courseService.getTopicCourses(this.techCoursesId).then(courses => this.techCourses = courses)
  
  }

  ngOnDestroy(): void {
    this.techSubscription?.unsubscribe();
    this.techIdSubscription?.unsubscribe();
  }

}
