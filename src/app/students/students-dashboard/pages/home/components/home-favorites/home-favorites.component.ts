import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/admins/admins-dashboard/pages/courses/interface/course';
import { CoursesService } from 'src/app/admins/admins-dashboard/pages/courses/service/courses.service';
import { User } from 'src/app/login/types/user';
import { UsersService } from 'src/app/shared/services/users/users.service';

@Component({
  selector: 'app-home-favorites',
  templateUrl: './home-favorites.component.html',
  styleUrls: ['./home-favorites.component.scss']
})
export class HomeFavoritesComponent implements OnInit {

  userFavorites: string[] = [];
  favouriteCourses: Course[] = [];

  constructor( private userService: UsersService, private courseService: CoursesService ) {}

  ngOnInit(): void {
    const userInfo = this.getUserInfo();
    this.userFavorites = userInfo?.favorites ? userInfo?.favorites : [];
    this.courseService.getTopicCourses(this.userFavorites).then(courses => this.favouriteCourses = courses);
  }

  public getUserInfo(): User {
    return this.userService.getUserFromStorage() as User;
  }

}
