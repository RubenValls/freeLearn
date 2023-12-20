import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap } from 'rxjs/operators';
import { CoursesActions } from './courses.actions';
import { Course } from 'src/app/admins/admins-dashboard/pages/courses/interface/course';
import { CoursesService } from 'src/app/admins/admins-dashboard/pages/courses/service/courses.service';


@Injectable()
export class CoursesEffects {
  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType('Fetch Courses'),
      exhaustMap(() =>
        this.coursesService
            .getCourses()
            .pipe(map((courses: Course[]) => CoursesActions.retrievedCoursesList({ courses })))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private coursesService: CoursesService
  ) {}
}


