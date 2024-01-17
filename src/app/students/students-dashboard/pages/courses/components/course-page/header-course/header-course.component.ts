import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Course } from 'src/app/admins/admins-dashboard/pages/courses/interface/course';
import { CoursesService } from 'src/app/admins/admins-dashboard/pages/courses/service/courses.service';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';
import { UsersService } from 'src/app/shared/services/users/users.service';


@Component({
  selector: 'app-header-course',
  templateUrl: './header-course.component.html',
  styleUrls: ['./header-course.component.scss']
})
export class HeaderCourseComponent implements OnInit {
  
  userId: string = '';
  course:any;
  courseId: string = '';
  isFavorite: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UsersService,
    private alertMessage: AlertsService,
  
 
  ) { 

    this.route.data.subscribe(data => {    
      this.course = data['data']     
    });

  }
  ngOnInit(): void {
   
    const user = this.userService.getUserFromStorage();
    this.userId = user?.id

    this.route.params.subscribe(params => {
      this.courseId = params['id'];
    });

    this.isFavorite = user?.favorites?.includes(this.courseId);


  }

  onFavoriteClick() {
    this.userService.updateFavoriteCourses(this.courseId).then(( res) => {
      this.alertMessage.successMessage(  res.message);
    }).catch((error) => this.alertMessage.errorMessage(error.message));
    this.isFavorite = !this.isFavorite;
  }

 
}


