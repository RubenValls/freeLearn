import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Instructor } from 'src/app/admins/admins-dashboard/pages/instructors/instructors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() instructor: Instructor | undefined
  @Output() handleUpdate = new EventEmitter();

  onRatingChanged(rating: number){
    this.handleUpdate.emit(rating)
  }
  
}
