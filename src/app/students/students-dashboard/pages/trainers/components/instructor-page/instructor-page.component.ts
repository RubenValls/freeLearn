import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Instructor } from 'src/app/admins/admins-dashboard/pages/instructors/instructors';

@Component({
  selector: 'app-instructor-page',
  templateUrl: './instructor-page.component.html',
  styleUrls: ['./instructor-page.component.scss']
})
export class InstructorPageComponent {
  instructor: Instructor | undefined
  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe(data => {
      this.instructor = data['data']
      console.log(this.instructor)
    });
  }
}
