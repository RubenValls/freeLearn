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
  
  userId: string = '';
  course:any;
  constructor(
    private route: ActivatedRoute,
    private userService: UsersService,
 
  ) { 
    this.route.data.subscribe(data => {    
      this.course = data['data']
    });
  }
  ngOnInit(): void {
    const user = this.userService.getUserFromStorage();
    this.userId = user?.id
  }

 
}
