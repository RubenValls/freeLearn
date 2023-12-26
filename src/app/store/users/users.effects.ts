import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap } from 'rxjs/operators';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { UsersActions } from './users.actions';



@Injectable()
export class UsersEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType('Fetch Users'),
      exhaustMap(() =>
        this.userService
            .getUsers()
            .pipe(map((users: any[]) => UsersActions.retrievedUsersList({ users })))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UsersService
  ) {}
}