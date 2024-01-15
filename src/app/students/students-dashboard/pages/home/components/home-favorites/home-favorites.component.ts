import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/admins/admins-dashboard/pages/courses/interface/course';
import { CoursesService } from 'src/app/admins/admins-dashboard/pages/courses/service/courses.service';
import { User } from 'src/app/login/types/user';
import { UsersService } from 'src/app/shared/services/users/users.service';

@Component({
  selector: 'app-home-favorites',
  templateUrl: './home-favorites.component.html',
  styleUrls: ['./home-favorites.component.css']
})
export class HomeFavoritesComponent implements OnInit {

  userFavorites: string[] = [];
  favouriteCourses: Course[] = [];

  constructor( private userService: UsersService, private courseService: CoursesService ) {}

  ngOnInit(): void {
    const userInfo = this.userService.getUserFromStorage() as User
    this.userFavorites = userInfo?.favorites ? userInfo?.favorites : []
    this.courseService.getTopicCourses(this.userFavorites).then(courses => this.favouriteCourses = courses)
  }

}
