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
  courseId: string = '';
  instructorsId: string[] | undefined;
  techsId: string[] | undefined;
  userId: string = '';
  areLessonsVisible: boolean = false;

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
    });

    this.instructorsId = this.course?.instructorId?.map(instructor => instructor.id);
    this.techsId = this.course?.techs?.map(tech => tech.id);
    this.course?.lessons?.length ? this.areLessonsVisible = true : this.areLessonsVisible = false;
  }

  handleUpdate(rating: number) {
    debugger
    if (this.userId && this.courseId) {
      const newRating = {
        userId: this.userId,
        rating: rating
      }

      this.courseService.updateCourseRating(this.courseId, newRating).then((courseUpdate) => {
        this.course = courseUpdate
        console.log('courseUpdate', courseUpdate?.rating)
        console.log('this.course', this.course?.rating)
      })
    }
  }


}
