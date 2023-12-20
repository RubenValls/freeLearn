import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap } from 'rxjs/operators';
import { TechService } from 'src/app/admins/admins-dashboard/pages/technologies/service/tech.service';
import { TechnologyType } from 'src/app/admins/admins-dashboard/pages/technologies/types/technologies';
import { TechnologiesActions } from './technologies.actions';


@Injectable()
export class TechnologiesEffects {
  loadTechnologies$ = createEffect(() =>
    this.actions$.pipe(
      ofType('Fetch Technologies'),
      exhaustMap(() =>
        this.technologiesService
            .getTechnologies()
            .pipe(map((technologies: TechnologyType[]) => TechnologiesActions.retrievedTechnologiesList({ technologies })))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private technologiesService: TechService
  ) {}
}


