import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/admins/admins-dashboard/pages/courses/interface/course';
import { CoursesService } from 'src/app/admins/admins-dashboard/pages/courses/service/courses.service';
import { UsersService } from 'src/app/shared/services/users/users.service';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss']
})
export class CoursePageComponent implements OnInit {
  course: Course | undefined
  courseId: string | undefined;
  instructorsId: string[] | undefined;
  techsId: string[] | undefined;
  userId: string = '';
  constructor(
    private courseService: CoursesService,
    private route: ActivatedRoute,
    private userService: UsersService,
  ) {
    this.route.data.subscribe(data => {
      this.course = data['data'];
    });
  }
  ngOnInit(): void {
    const user = this.userService.getUserFromStorage();
    this.userId = user?.id;

    this.route.params.subscribe(params => {
      this.courseId = params['id'];
      console.log(this.courseId);
    });

    this.instructorsId = this.course?.instructorId?.map(instructor => instructor.id);
    this.techsId = this.course?.techs?.map(tech => tech.id);
  }
  handleUpdate(rating: number) {   
    if (this.userId && this.course?.id) {
      const newRating = {
        userId: this.userId,
        rating: rating
      }

      this.courseService.updateCourseRating(this.course?.id, newRating).then((instructorUpdated) => {
        this.course = instructorUpdated
      })
    }
  }


}
