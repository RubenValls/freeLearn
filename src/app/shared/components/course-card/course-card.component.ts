import { Component, Input } from '@angular/core';
import { Course } from 'src/app/admins/admins-dashboard/pages/courses/interface/course';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {

  @Input() course: Course | undefined

  handleDescription(description: string){
    return description.length > 100 ? description.slice(0, 100) + '...' : description
  }
}
