import { Component, Input } from '@angular/core';
import { Course } from 'src/app/admins/admins-dashboard/pages/courses/interface/course';

@Component({
  selector: 'app-course-cards',
  templateUrl: './course-cards.component.html',
  styleUrls: ['./course-cards.component.scss']
})
export class CourseCardsComponent {
@Input() course: Course | undefined;
}
