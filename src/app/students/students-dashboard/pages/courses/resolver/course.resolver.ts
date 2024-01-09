import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { InstructorsService } from 'src/app/admins/admins-dashboard/pages/instructors/instructors-service/instructors.service';


export const courseResolver: ResolveFn<any> = (route, state) => {
  
  const courseResolver = inject(InstructorsService)
  return courseResolver.getInstructorById(route.paramMap.get('id') || '')
};
