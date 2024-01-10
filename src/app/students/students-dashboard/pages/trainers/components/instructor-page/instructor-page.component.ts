import { InstructorsService } from 'src/app/admins/admins-dashboard/pages/instructors/instructors-service/instructors.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Instructor } from 'src/app/admins/admins-dashboard/pages/instructors/instructors';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-instructor-page',
  templateUrl: './instructor-page.component.html',
  styleUrls: ['./instructor-page.component.scss']
})
export class InstructorPageComponent implements OnInit, OnDestroy{
  instructor: Instructor | undefined;
  userId: string = '';
  instructorId: string = '';
  instructorSubscription: Subscription | undefined;
  instructorIdSubscription: Subscription | undefined;

  
  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private instructorsService: InstructorsService,
    ) {
    this.instructorSubscription = this.route.data.subscribe(data => {
      this.instructor = data['data']
    });
    this.instructorIdSubscription = this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      this.instructorId = idParam ? idParam : ''
    })
  }

  ngOnInit(): void {
    const user = this.usersService.getUserFromStorage();
    this.userId = user?.id
  }

  ngOnDestroy(): void {
    this.instructorSubscription?.unsubscribe()
    this.instructorIdSubscription?.unsubscribe()
  }

  handleUpdate(rating: number){
    if(this.userId && this.instructorId){
      const newRating = {
        userId: this.userId,
        rating: rating
      }

      this.instructorsService.updateInstructorsRating(this.instructorId, newRating).then((instructorUpdated) => {
        this.instructor = instructorUpdated
      })
    }
  }
}
