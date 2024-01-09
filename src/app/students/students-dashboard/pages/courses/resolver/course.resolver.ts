import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { CoursesService } from 'src/app/admins/admins-dashboard/pages/courses/service/courses.service';

export const courseResolver: ResolveFn<any> = (route, state) => {
  
  const courseResolver = inject(CoursesService)
  return courseResolver.getCourseById(route.paramMap.get('id') || '')
};
