import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { InstructorsService } from 'src/app/admins/admins-dashboard/pages/instructors/instructors-service/instructors.service';


export const instructorResolver: ResolveFn<any> = (route, state) => {
  
  const instructorService = inject(InstructorsService)
  return instructorService.getInstructorById(route.paramMap.get('id') || '')
};
