import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap } from 'rxjs/operators';
import { InstructorsService } from 'src/app/admins/admins-dashboard/pages/instructors/instructors-service/instructors.service';
import { InstructorsActions } from './instructors.actions';
import { Instructor } from 'src/app/admins/admins-dashboard/pages/instructors/instructors';


@Injectable()
export class InstructorsEffects {
  loadInstructors$ = createEffect(() =>
    this.actions$.pipe(
      ofType('Fetch Instructors'),
      exhaustMap(() =>
        this.instructorsService
            .getInstructors()
            .pipe(map((instructors: Instructor[]) => InstructorsActions.retrievedInstructorsList({ instructors })))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private instructorsService: InstructorsService
  ) {}
}


