import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { selectInstructor } from 'src/app/store/instructors/instructors.selectors';

export const instructorResolver: ResolveFn<any> = (route, state) => {
  const store = inject(Store);
  const instructors$ = store.select(selectInstructor);
  return instructors$.pipe(
    map(data => {
      const id = route.paramMap.get('id');
      const array = [...data];
      return array.filter(item => item.id === id);
    })
  );
};
