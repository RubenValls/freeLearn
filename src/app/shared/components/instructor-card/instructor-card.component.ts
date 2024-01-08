import { Component, Input } from '@angular/core';
import { Instructor } from 'src/app/admins/admins-dashboard/pages/instructors/instructors';

@Component({
  selector: 'app-instructor-card',
  templateUrl: './instructor-card.component.html',
  styleUrls: ['./instructor-card.component.scss']
})
export class InstructorCardComponent {
  @Input() instructor:Instructor | undefined;
}
