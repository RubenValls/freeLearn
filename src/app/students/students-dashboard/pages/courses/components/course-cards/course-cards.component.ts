import { Component, Input } from '@angular/core';
import { Course } from 'src/app/admins/admins-dashboard/pages/courses/interface/course';

@Component({
  selector: 'app-course-cards',
  templateUrl: './course-cards.component.html',
  styleUrls: ['./course-cards.component.scss']
})
export class CourseCardsComponent {
  @Input() course: Course | undefined;


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
