import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/admins/admins-dashboard/pages/courses/interface/course';


@Component({
  selector: 'app-header-course',
  templateUrl: './header-course.component.html',
  styleUrls: ['./header-course.component.scss']
})
export class HeaderCourseComponent {
  isDescriptionCollapsed = false;
  isRatingCollapsed = false;
  course:Course | undefined
  constructor(
    private route: ActivatedRoute
  ) { 
    this.route.data.subscribe(data => {    
      this.course = data['data']
    });
  }

  getRatingAverage(ratings: any[] | undefined): number {
    const sum = ratings?.reduce((total, item) => total + item.rating, 0);
    let average = 0;
    let roundedAverage = 0;
    if (ratings?.length) {
      average = sum / ratings?.length;
      roundedAverage = Math.round(average);
    }
    return roundedAverage;
  }
}
