import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/admins/admins-dashboard/pages/courses/interface/course';
import { CoursesService } from 'src/app/admins/admins-dashboard/pages/courses/service/courses.service';
import { UsersService } from 'src/app/shared/services/users/users.service';


@Component({
  selector: 'app-header-course',
  templateUrl: './header-course.component.html',
  styleUrls: ['./header-course.component.scss']
})
export class HeaderCourseComponent implements OnInit {
  isDescriptionCollapsed = false;
  isRatingCollapsed = false;
  userId: string = '';
  course:any;
  constructor(
    private route: ActivatedRoute,
    private userService: UsersService,
    private courseService: CoursesService,
  ) { 
    this.route.data.subscribe(data => {    
      this.course = data['data']
    });
  }
  ngOnInit(): void {
    const user = this.userService.getUserFromStorage();
    this.userId = user?.id
  }

  handleUpdate(rating: number){
    if(this.userId && this.course?.id){
      const newRating = {
        userId: this.userId,
        rating: rating
      }

      this.courseService.updateCourseRating(this.course?.id, newRating).then((instructorUpdated) => {
        this.course = instructorUpdated
      })
    }
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
