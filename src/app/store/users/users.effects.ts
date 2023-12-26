import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap } from 'rxjs/operators';
import { UsersActions } from './users.actions';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { User } from 'src/app/login/types/user';



@Injectable()
export class UsersEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType('Fetch Users'),
      exhaustMap(() =>
        this.usersService
            .getUsers()
            .pipe(map((users: User[]) => UsersActions.retrievedUsersList({ users })))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private usersService: UsersService
  ) {}
}