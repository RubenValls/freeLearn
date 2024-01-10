import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { TechService } from 'src/app/admins/admins-dashboard/pages/technologies/service/tech.service';

export const technologiesResolver: ResolveFn<any> = (route, state) => {
  const techService = inject(TechService)
  return techService.getTechnologyById(route.paramMap.get('id') || '')
};
